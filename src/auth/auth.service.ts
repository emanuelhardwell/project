import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HandleError } from '../common/errors/handle-error';
import * as bcrypt from 'bcrypt';
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

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where([{ username: loginDto.username }, { email: loginDto.username }])
        .getOne();

      if (!user) {
        throw new BadRequestException(`Username or password invalid!`);
      }

      const validPaswword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!validPaswword) {
        throw new BadRequestException(`Username or password invalid!`);
      }

      return user;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  private async generateJWT(payload: jwt): Promise<string> {
    try {
      const jwt = await this.jwtService.signAsync(payload);
      return jwt;
    } catch (error) {
      this.handleError.error(error);
    }
  }
}
