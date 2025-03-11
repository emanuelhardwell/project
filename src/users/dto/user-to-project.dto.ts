import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ACCESS_LEVEL } from '../../enums/roles.enum';
import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';

export class UserToProjectDto {
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;

  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;
}
