import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favRepo: Repository<Favorite>,
  ) {}

  async findAll(userId: string) {
    return this.favRepo.find({
      where: { userId },
      order: { name: 'ASC' },
    });
  }

  async create(
    userId: string,
    data: { name: string; country: string; lat: number; lon: number },
  ) {
    const existing = await this.favRepo.findOne({
      where: { userId, lat: data.lat, lon: data.lon },
    });

    if (existing) {
      throw new ConflictException('City already saved');
    }

    const newFav = this.favRepo.create({
      ...data,
      userId,
    });
    return this.favRepo.save(newFav);
  }

  async remove(userId: string, id: string) {
    const result = await this.favRepo.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }
}
