import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from '../interfaces/auth.interface';

export class LoginDto implements AuthBody {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
