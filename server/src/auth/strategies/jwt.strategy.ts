import { ExtractJwt, Strategy } from 'passport-jwt';
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
        (request: {
          cookies?: Record<string, string>;
          headers?: { cookie?: string };
        }) => {
          if (request.cookies?.access_token) {
            return request.cookies.access_token;
          }

          const cookieHeader = request.headers?.cookie;
          if (!cookieHeader) {
            return null;
          }

          const tokenCookie = cookieHeader
            .split(';')
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith('access_token='));

          return tokenCookie
            ? decodeURIComponent(tokenCookie.split('=')[1] ?? '')
            : null;
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
