import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

function parseCookieHeader(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, item) => {
    const [key, ...value] = item.trim().split('=');
    acc[key] = decodeURIComponent(value.join('='));
    return acc;
  }, {});
}

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = parseCookieHeader(request.headers?.cookie);
    const state =
      typeof request.query.state === 'string' ? request.query.state : undefined;

    return {
      state: state ?? cookies.oauth_state,
      codeChallenge: cookies.pkce_challenge,
      codeChallengeMethod: 'S256',
    };
  }
}

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = parseCookieHeader(request.headers?.cookie);
    const state =
      typeof request.query.state === 'string' ? request.query.state : undefined;

    return {
      state: state ?? cookies.oauth_state,
      codeChallenge: cookies.pkce_challenge,
      codeChallengeMethod: 'S256',
    };
  }
}
