import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL, ROLES } from '../../enums/roles.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { METADATA_ACCESS_LEVEL } from '../decorators/access-level-protected.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessLevel: ACCESS_LEVEL = this.reflector.get(
      METADATA_ACCESS_LEVEL,
      context.getHandler(),
    );

    if (!accessLevel) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const userReq = request.user as UserEntity;
    const user: UserEntity = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: userReq.id })
      .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
      .leftJoinAndSelect('projectsIncludes.project', 'project')
      .getOne();

    if (user.role === ROLES.ADMIN) {
      return true;
    }

    // request.params.id ... el id es del projecto
    const userExistInProject = user?.projectsIncludes?.find(
      (project) => project.project.id === request.params.id,
    );

    if (!userExistInProject) {
      throw new UnauthorizedException('No perteneces a este proyecto!');
    }

    if (accessLevel !== userExistInProject.accessLevel) {
      throw new UnauthorizedException(
        'No tienes el nivel de acceso a este proyecto!',
      );
    }

    return true;
  }
}
