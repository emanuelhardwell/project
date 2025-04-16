import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { ROLES } from '../enums/roles.enum';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth(ROLES.ADMIN)
  @Get('profile')
  getProfile(@GetUser() user: UserEntity) {
    return user;
  }
}
