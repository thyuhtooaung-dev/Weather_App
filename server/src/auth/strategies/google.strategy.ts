import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const backendBaseUrl =
      configService.get<string>('SERVER_URL') ??
      'https://weather-app-backend-bzxa.onrender.com';

    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ??
        `${backendBaseUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
      state: true,
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
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    const user: GoogleUser = {
      email: emails && emails[0] ? emails[0].value : '',
      firstName: name ? name.givenName : '',
      lastName: name ? name.familyName : '',
      picture: photos && photos[0] ? photos[0].value : '',
      socialId: profile.id,
      provider: 'google',
      accessToken,
    };

    done(null, user);
  }
}
