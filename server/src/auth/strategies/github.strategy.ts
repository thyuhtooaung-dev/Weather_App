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
      callbackURL: 'http://localhost:3000/auth/github/redirect',
      scope: ['user:email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any) => void,
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
