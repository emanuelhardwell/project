import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.project)
  tasks: TaskEntity[];
}
