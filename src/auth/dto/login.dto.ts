import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthBody } from '../interfaces/auth.interface';

export class LoginDto implements AuthBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
