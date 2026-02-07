import {
  Controller,
  Get,
  Req,
  UseGuards,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { AuthService } from './auth.service';
import * as types from './types';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: types.GoogleAuthRequest,
    @Res() res: express.Response,
  ) {
    const result = await this.authService.validateOAuthLogin(req.user);
    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${clientUrl}/weather`);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth() {}

  @Get('github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(
    @Req() req: types.GoogleAuthRequest,
    @Res() res: express.Response,
  ) {
    const result = await this.authService.validateOAuthLogin(req.user);
    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${clientUrl}/weather`);
  }

  @Post('logout')
  logout(@Res() res: express.Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ success: true });
  }

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string; firstName: string },
  ) {
    return this.authService.register(body.email, body.password, body.firstName);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
