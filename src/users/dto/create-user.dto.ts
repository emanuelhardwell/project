import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from 'src/enums/roles.enum';
import { IUser } from 'src/interfaces/user.interface';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
