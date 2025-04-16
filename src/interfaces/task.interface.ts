import { STATUS_TASK } from '../enums/roles.enum';

export interface ITask {
  name: string;
  description: string;
  status: STATUS_TASK;
  responsableName: string;
}
