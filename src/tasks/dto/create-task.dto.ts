import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { STATUS_TASK } from '../../enums/roles.enum';
import { ITask } from '../../interfaces/task.interface';
import { ProjectEntity } from '../../projects/entities/project.entity';

export class CreateTaskDto implements ITask {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  responsableName: string;

  @IsUUID()
  project: ProjectEntity;
}
