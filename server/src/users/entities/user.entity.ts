import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  provider: 'google' | 'github' | 'local';

  @Column({ nullable: true })
  socialId: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
