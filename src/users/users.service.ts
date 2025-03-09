import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleError } from '../common/errors/handle-error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly handleError: HandleError,
  ) {
    this.handleError.setServiceName('UsersService');
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(createUserDto);
      const userSaved = await this.userRepository.save(user);
      delete userSaved.password;

      return userSaved;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user) {
        throw new BadRequestException(`User with id: ${id} not found!`);
      }
      return user;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserDto,
      );
      if (user.affected === 0) {
        throw new BadRequestException(
          `User to update with id: ${id} not found!`,
        );
      }
      return user;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        throw new BadRequestException(
          `User to delete with id: ${id} not found!`,
        );
      }

      return user;
    } catch (error) {
      this.handleError.error(error);
    }
  }
}
