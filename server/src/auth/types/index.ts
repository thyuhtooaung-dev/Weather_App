import { Request } from 'express';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName?: string;
  picture: string;
  socialId: string;
  provider: string;
  accessToken: string;
}

export interface JwtUser {
  userId: string;
  email: string;
}

export interface GoogleAuthRequest extends Request {
  user: GoogleUser;
}

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
