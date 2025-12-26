import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { HandleError } from '../../src/common/errors/handle-error';
import { ProjectEntity } from '../../src/projects/entities/project.entity';
import { ProjectsService } from '../../src/projects/projects.service';
import { UsersProjectsEntity } from '../../src/users/entities/usersProjects.entity';
import { Repository } from 'typeorm';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepository: Repository<ProjectEntity>;
  let handleError: HandleError;

  const mockProjects = [
    { id: '1', name: 'Proyecto A', description: 'Desc A' },
    { id: '2', name: 'Proyecto B', description: 'Desc B' },
  ] as ProjectEntity[];

  const mockProjectsEmpty = [] as ProjectEntity[];

  // Mock del repositorio
  const mockProjectRepository = {
    find: jest.fn(),
  };

  const mockUsersProjectsRepository = {}; // No se usa en findAll, pero se inyecta

  // Mock de HandleError
  const mockHandleError = {
    setServiceName: jest.fn(),
    error: jest.fn((err) => {
      // Simulamos que el manejador lanza una excepción, como hace tu clase real
      throw new BadRequestException(err.message);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: mockProjectRepository,
        },
        {
          provide: getRepositoryToken(UsersProjectsEntity),
          useValue: mockUsersProjectsRepository,
        },
        {
          provide: HandleError,
          useValue: mockHandleError,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepository = module.get<Repository<ProjectEntity>>(
      getRepositoryToken(ProjectEntity),
    );
    handleError = module.get<HandleError>(HandleError);

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debe retornar un array de proyectos exitosamente', async () => {
      // Arrange (Preparar)
      mockProjectRepository.find.mockResolvedValue(mockProjects);

      // Act (Actuar)
      const result = await service.findAll();

      // Assert (Afirmar)
      expect(result).toEqual(mockProjects);
      expect(mockProjectRepository.find).toHaveBeenCalledTimes(1);
      expect(mockProjectRepository.find).toHaveBeenCalledWith();
    });

    it('debe retornar un array vacio de proyectos exitosamente', async () => {
      mockProjectRepository.find.mockResolvedValue(mockProjectsEmpty);

      const result = await service.findAll();

      expect(result).toEqual(mockProjectsEmpty);
      expect(mockProjectRepository.find).toHaveBeenCalledTimes(1);
      expect(mockProjectRepository.find).toHaveBeenCalledWith();
    });

    it('debe llamar a handleError cuando el repositorio falla', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockProjectRepository.find.mockRejectedValue(error);

      // Act & Assert
      // Esperamos que falle porque handleError lanza una excepción
      await expect(service.findAll()).rejects.toThrow(BadRequestException);

      expect(mockHandleError.error).toHaveBeenCalledWith(error);
    });
  });
});
