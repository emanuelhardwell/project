import { ProjectEntity } from 'src/projects/entities/project.entity';

export const mockProject: ProjectEntity = {
  id: '1',
  name: 'Proyecto A',
  description: 'Desc A',
  usersIncludes: [],
  tasks: [],
  createdAt: undefined,
  updatedAt: undefined,
};

export const mockProjectA: ProjectEntity = {
  ...mockProject,
  id: '1',
  name: 'Proyecto A',
  description: 'Desc A',
};

export const mockProjectB: ProjectEntity = {
  ...mockProject,
  id: '2',
  name: 'Proyecto B',
  description: 'Desc B',
};
