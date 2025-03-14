import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CommonModule } from '../common/common.module';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersProjectsEntity]),
    CommonModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
