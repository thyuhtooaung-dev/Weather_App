import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      state: false,
    });
  }

  authorizationParams(options: Record<string, string>) {
    const params: Record<string, string> = {};

    if (options.codeChallenge) {
      params.code_challenge = options.codeChallenge;
      params.code_challenge_method = options.codeChallengeMethod ?? 'S256';
    }

    if (options.state) {
      params.state = options.state;
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
      picture: photos && photos.length > 0 ? photos[0].value : '',
      socialId: profile.id,
      provider: 'google',
      accessToken,
    };

    done(null, user);
  }
}
