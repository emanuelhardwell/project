import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
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

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
