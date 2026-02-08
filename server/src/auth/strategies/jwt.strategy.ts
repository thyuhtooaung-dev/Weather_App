import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          if (request.cookies && request.cookies.access_token) {
            return request.cookies.access_token;
          }
          const cookieHeader = request.headers?.cookie;
          if (!cookieHeader) return null;
          const tokenCookie = cookieHeader
            .split(';')
            .map((c) => c.trim())
            .find((c) => c.startsWith('access_token='));

          if (!tokenCookie) return null;
          return decodeURIComponent(
            tokenCookie.substring(tokenCookie.indexOf('=') + 1),
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const sessionIsValid = await this.authService.isSessionValid(payload.sid);
    if (!sessionIsValid) {
      throw new UnauthorizedException('Session invalid or expired');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      sessionId: payload.sid,
    };
  }
}
