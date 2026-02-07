import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';
import * as types from './types';
import { ConfigService } from '@nestjs/config';
import { GithubOauthGuard, GoogleOauthGuard } from './guards/oauth.guard';
import { buildPkcePair, generateRandomToken } from './utils/oauth.util';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private setAccessTokenCookie(
    res: express.Response,
    token: string,
    expiresAt: Date,
  ) {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: expiresAt.getTime() - Date.now(),
      path: '/',
    });
  }

  private getOauthCookieOptions() {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      maxAge: 10 * 60 * 1000,
      path: '/',
    };
  }

  private parseCookies(req: express.Request): Record<string, string> {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return {};

    return cookieHeader
      .split(';')
      .reduce<Record<string, string>>((acc, entry) => {
        const [rawKey, ...rawValue] = entry.trim().split('=');
        acc[rawKey] = decodeURIComponent(rawValue.join('='));
        return acc;
      }, {});
  }

  @Get('google')
  googleAuth(@Res() res: express.Response) {
    const state = generateRandomToken(24);
    const pkce = buildPkcePair();

    const cookieOptions = this.getOauthCookieOptions();

    res.cookie('oauth_state', state, cookieOptions);
    res.cookie('pkce_verifier', pkce.verifier, cookieOptions);
    res.cookie('pkce_challenge', pkce.challenge, cookieOptions);

    return res.redirect(
      `/auth/google/start?state=${encodeURIComponent(state)}`,
    );
  }

  @Get('google/start')
  @UseGuards(GoogleOauthGuard)
  googleAuthStart() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: types.GoogleAuthRequest,
    @Res() res: express.Response,
  ) {
    const cookies = this.parseCookies(req);
    const callbackState =
      typeof req.query.state === 'string' ? req.query.state : undefined;

    if (!callbackState || callbackState !== cookies.oauth_state) {
      throw new UnauthorizedException('Invalid OAuth state');
    }

    if (!req.user) {
      throw new UnauthorizedException('OAuth authentication failed');
    }

    const result = await this.authService.validateOAuthLogin(req.user, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
    });
    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    this.setAccessTokenCookie(res, result.access_token, result.expiresAt);
    res.clearCookie('oauth_state');
    res.clearCookie('pkce_verifier');
    res.clearCookie('pkce_challenge');

    res.redirect(`${clientUrl}/weather`);
  }

  @Get('github')
  githubAuth(@Res() res: express.Response) {
    const state = generateRandomToken(24);
    const pkce = buildPkcePair();

    const cookieOptions = this.getOauthCookieOptions();

    res.cookie('oauth_state', state, cookieOptions);
    res.cookie('pkce_verifier', pkce.verifier, cookieOptions);
    res.cookie('pkce_challenge', pkce.challenge, cookieOptions);

    return res.redirect(
      `/auth/github/start?state=${encodeURIComponent(state)}`,
    );
  }

  @Get('github/start')
  @UseGuards(GithubOauthGuard)
  githubAuthStart() {}

  @Get('github/redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(
    @Req() req: types.GoogleAuthRequest,
    @Res() res: express.Response,
  ) {
    const cookies = this.parseCookies(req);
    const callbackState =
      typeof req.query.state === 'string' ? req.query.state : undefined;

    if (!callbackState || callbackState !== cookies.oauth_state) {
      throw new UnauthorizedException('Invalid OAuth state');
    }

    if (!req.user) {
      throw new UnauthorizedException('OAuth authentication failed');
    }

    const result = await this.authService.validateOAuthLogin(req.user, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
    });
    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    this.setAccessTokenCookie(res, result.access_token, result.expiresAt);
    res.clearCookie('oauth_state');
    res.clearCookie('pkce_verifier');
    res.clearCookie('pkce_challenge');

    res.redirect(`${clientUrl}/weather`);
  }

  @Post('logout')
  async logout(@Req() req: express.Request, @Res() res: express.Response) {
    const token = this.parseCookies(req).access_token;

    if (token) {
      const decodedPayload: unknown = this.jwtService.decode(token);
      let sessionId: string | null = null;

      if (typeof decodedPayload === 'object' && decodedPayload !== null) {
        const sid = (decodedPayload as Record<string, unknown>).sid;
        if (typeof sid === 'string') {
          sessionId = sid;
        }
      }

      if (sessionId) {
        await this.authService.revokeSession(sessionId);
      }
    }

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite:
        this.configService.get<string>('NODE_ENV') === 'production'
          ? 'none'
          : 'lax',
      path: '/',
    });

    return res.status(200).json({ success: true });
  }

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string; firstName: string },
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const result = await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? undefined,
      },
    );

    this.setAccessTokenCookie(res, result.access_token, result.expiresAt);
    return res.status(201).json({ user: result.user });
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const result = await this.authService.login(body.email, body.password, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
    });

    this.setAccessTokenCookie(res, result.access_token, result.expiresAt);
    return res.status(200).json({ user: result.user });
  }
}
