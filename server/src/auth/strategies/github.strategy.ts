import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  authorizationParams(options: Record<string, string>) {
    const params: Record<string, string> = {};

    if (options.codeChallenge) {
      params.code_challenge = options.codeChallenge;
      params.code_challenge_method = options.codeChallengeMethod ?? 'S256';
    }

    return params;
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: GoogleUser) => void,
  ) {
    const { username, photos, emails } = profile;
    const user: GoogleUser = {
      email: emails && emails[0] ? emails[0].value : '',
      firstName: username || '',
      picture: photos && photos[0] ? photos[0].value : '',
      socialId: profile.id,
      provider: 'github',
      accessToken,
    };
    done(null, user);
  }
}
