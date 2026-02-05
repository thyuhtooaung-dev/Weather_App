import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';
import * as types from '../auth/types';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(private readonly favService: FavoritesService) {}

  @Get()
  async findAll(@Req() req: types.AuthenticatedRequest) {
    return this.favService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req: types.AuthenticatedRequest, @Body() body: any) {
    return this.favService.create(req.user.userId, body);
  }

  @Delete(':id')
  async remove(
    @Req() req: types.AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.favService.remove(req.user.userId, id);
  }
}
