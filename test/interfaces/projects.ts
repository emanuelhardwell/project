import { DeleteResult } from 'typeorm';
import { ProjectEntity } from '../../src/projects/entities/project.entity';

export interface DeleteResultProject extends DeleteResult {
  raw: ProjectEntity;
  affected?: number | null;
}
