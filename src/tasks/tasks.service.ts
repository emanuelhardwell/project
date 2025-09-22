import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult, Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleError } from '../common/errors/handle-error';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly handleError: HandleError,
  ) {
    this.handleError.setServiceName('TasksService');
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const taskSearch = await this.taskRepository.findBy({
        name: createTaskDto.name,
      });
      if (taskSearch) {
        throw new BadRequestException(`The name of this task already exists`);
      }

      const task = await this.taskRepository.save(createTaskDto);
      return task;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findAll(): Promise<TaskEntity[]> {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findOne(id: string): Promise<TaskEntity> {
    try {
      const queryBuilder = this.taskRepository.createQueryBuilder('Taks');
      const task = await queryBuilder
        .where({ id })
        .leftJoinAndSelect('Taks.project', 'projectId')
        .getOne();

      if (!task) {
        throw new NotFoundException(`Task with id: ${id} not found!`);
      }

      return task;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async findOneById(id: string): Promise<TaskEntity> {
    try {
      const task: TaskEntity = await this.taskRepository.findOneBy({ id });
      if (!task) {
        throw new NotFoundException(`Task with id: ${id} not found!`);
      }
      return task;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    try {
      const task: TaskEntity = await this.findOneById(id);
      this.taskRepository.merge(task, updateTaskDto);
      const taskUpdated = await this.taskRepository.save(task);
      return taskUpdated;
    } catch (error) {
      this.handleError.error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const task: DeleteResult = await this.taskRepository.delete(id);

      if (task.affected === 0) {
        throw new NotFoundException(`Task to delete with id: ${id} not found!`);
      }

      return task;
    } catch (error) {
      this.handleError.error(error);
    }
  }
}
