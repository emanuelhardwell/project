import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { STATUS_TASK } from 'src/enums/roles.enum';
import { ITask } from 'src/interfaces/task.interface';

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
}
