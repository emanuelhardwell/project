import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { HandleError } from '../common/errors/handle-error';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly handleError: HandleError,
  ) {
    this.handleError.setServiceName('ProjectsService');
  }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.save(createProjectDto);
      return project;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findAll(): Promise<ProjectEntity[]> {
    try {
      const projects = await this.projectRepository.find();
      return projects;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findOne(id: string): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();

      if (!project) {
        throw new BadRequestException(`Project with id: ${id} not found!`);
      }

      return project;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      if (project.affected === 0) {
        throw new BadRequestException(
          `Project to update with id: ${id} not found!`,
        );
      }
      return project;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0) {
        throw new BadRequestException(
          `Project to delete with id: ${id} not found!`,
        );
      }

      return project;
    } catch (error) {
      this.handleError.error(error);
    }
  }
}
