import { ProjectEntity } from 'src/projects/entities/project.entity';
import { DeleteResult } from 'typeorm';

export interface DeleteResultProject extends DeleteResult {
  raw: ProjectEntity;
  affected?: number | null;
}
