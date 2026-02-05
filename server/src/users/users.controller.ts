import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as types from '../auth/types';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: types.AuthenticatedRequest) {
    return req.user;
  }
}
