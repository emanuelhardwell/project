import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IProject } from '../../interfaces/project.interface';

export class CreateProjectDto implements IProject {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
