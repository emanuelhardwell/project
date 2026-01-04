import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HandleError } from '../common/errors/handle-error';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwt } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly handleError: HandleError,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{
    user: UserEntity;
    access_token: string;
  }> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where([{ username: loginDto.username }, { email: loginDto.email }])
        .getOne();

      if (!user) {
        throw new BadRequestException(`Username or Email or password invalid!`);
      }

      const validPaswword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!validPaswword) {
        throw new BadRequestException(`Username or password invalid!`);
      }

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      return {
        user,
        access_token: this.generateJWT({
          id: user.id,
          name: user.name,
          role: user.role,
        }),
      };
    } catch (error) {
      this.handleError.error(error);
    }
  }

  private generateJWT(payload: jwt): string {
    try {
      const jwt = this.jwtService.sign(payload);
      return jwt;
    } catch (error) {
      this.handleError.error(error);
    }
  }
}
