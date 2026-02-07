import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { GoogleUser, JwtPayload } from './types';
import { AuthSession } from './entities/auth-session.entity';

const ACCESS_TOKEN_TTL_SECONDS = 60 * 60 * 2;
const BCRYPT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 10;
const LOCK_WINDOW_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly loginAttempts = new Map<
    string,
    { count: number; blockedUntil: number }
  >();

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AuthSession) private sessionRepo: Repository<AuthSession>,
    private jwtService: JwtService,
  ) {}

  private sanitizeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.firstName,
      avatar: user.avatar,
    };
  }

  private recordFailedAttempt(identifier: string) {
    const existing = this.loginAttempts.get(identifier);
    const now = Date.now();

    if (!existing || existing.blockedUntil < now) {
      this.loginAttempts.set(identifier, { count: 1, blockedUntil: 0 });
      return;
    }

    const updatedCount = existing.count + 1;
    this.loginAttempts.set(identifier, {
      count: updatedCount,
      blockedUntil:
        updatedCount >= MAX_FAILED_ATTEMPTS ? now + LOCK_WINDOW_MS : 0,
    });
  }

  private assertNotRateLimited(identifier: string) {
    const record = this.loginAttempts.get(identifier);
    const now = Date.now();

    if (!record) {
      return;
    }

    if (record.blockedUntil > now) {
      throw new HttpException(
        'Too many attempts, please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (record.blockedUntil <= now) {
      this.loginAttempts.delete(identifier);
    }
  }

  private clearFailedAttempts(identifier: string) {
    this.loginAttempts.delete(identifier);
  }

  private async issueSessionToken(
    user: User,
    context?: { ipAddress?: string; userAgent?: string },
  ) {
    const tokenId = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000);

    await this.sessionRepo.save(
      this.sessionRepo.create({
        userId: user.id,
        tokenId,
        expiresAt,
        ipAddress: context?.ipAddress,
        userAgent: context?.userAgent,
      }),
    );

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      sid: tokenId,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      }),
      expiresAt,
      user: this.sanitizeUser(user),
    };
  }

  async validateOAuthLogin(
    profile: GoogleUser,
    context?: { ipAddress?: string; userAgent?: string },
  ) {
    const normalizedEmail = profile.email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new BadRequestException(
        'OAuth provider did not return a usable email address.',
      );
    }

    let user = await this.userRepo.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      user = this.userRepo.create({
        email: normalizedEmail,
        firstName: profile.firstName,
        avatar: profile.picture,
        socialId: profile.socialId,
        provider: profile.provider as 'google' | 'github',
      });
      await this.userRepo.save(user);
    } else {
      if (profile.picture && user.avatar !== profile.picture) {
        user.avatar = profile.picture;
      }

      if (profile.firstName && user.firstName !== profile.firstName) {
        user.firstName = profile.firstName;
      }

      if (!user.socialId && profile.socialId) {
        user.socialId = profile.socialId;
      }

      if (!user.provider || user.provider === 'local') {
        user.provider = profile.provider as 'google' | 'github';
      }

      await this.userRepo.save(user);
    }

    return this.issueSessionToken(user, context);
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    context?: { ipAddress?: string; userAgent?: string },
  ) {
    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 12) {
      throw new BadRequestException(
        'Password must be at least 12 characters long.',
      );
    }

    const existing = await this.userRepo.findOne({
      where: { email: normalizedEmail },
    });
    if (existing) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = this.userRepo.create({
      email: normalizedEmail,
      password: hashedPassword,
      firstName,
      provider: 'local',
    });
    await this.userRepo.save(user);

    return this.issueSessionToken(user, context);
  }

  async login(
    email: string,
    pass: string,
    context?: { ipAddress?: string; userAgent?: string },
  ) {
    const normalizedEmail = email.trim().toLowerCase();
    const limiterKey = `${normalizedEmail}:${context?.ipAddress ?? 'unknown'}`;

    this.assertNotRateLimited(limiterKey);

    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: normalizedEmail })
      .getOne();

    if (!user || !user.password) {
      this.recordFailedAttempt(limiterKey);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      this.recordFailedAttempt(limiterKey);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.clearFailedAttempts(limiterKey);
    return this.issueSessionToken(user, context);
  }

  async revokeSession(tokenId: string) {
    await this.sessionRepo
      .createQueryBuilder()
      .update(AuthSession)
      .set({ revokedAt: new Date() })
      .where('tokenId = :tokenId AND revokedAt IS NULL', { tokenId })
      .execute();
  }

  async isSessionValid(tokenId: string): Promise<boolean> {
    const session = await this.sessionRepo.findOne({ where: { tokenId } });

    if (!session || session.revokedAt) {
      return false;
    }

    return session.expiresAt.getTime() > Date.now();
  }
}
