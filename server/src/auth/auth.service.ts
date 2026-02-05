import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { GoogleUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: GoogleUser) {
    let user = await this.userRepo.findOne({
      where: { email: profile.email },
    });

    if (!user) {
      user = this.userRepo.create({
        email: profile.email,
        firstName: profile.firstName,
        avatar: profile.picture,
        socialId: profile.socialId,
        provider: profile.provider as 'google' | 'github',
      });
      await this.userRepo.save(user);
    }

    return this.generateJwt(user);
  }

  generateJwt(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.firstName,
        avatar: user.avatar,
      },
    };
  }

  async register(email: string, password: string, firstName: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      firstName,
      provider: 'local',
    });
    await this.userRepo.save(user);

    return this.generateJwt(user);
  }

  async login(email: string, pass: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateJwt(user);
  }
}
