import { ITask } from '../../interfaces/task.interface';
import { BaseEntity } from '../../config/base.entity';
import { STATUS_TASK } from '../../enums/roles.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;

  @Column()
  responsableName: string;

  @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.tasks)
  project: ProjectEntity;
}
