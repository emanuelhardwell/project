import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from '../../enums/roles.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { METADATA_ROL } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: ROLES[] = this.reflector.get(
      METADATA_ROL,
      context.getHandler(),
    );

    console.log(validRoles);
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;

    if (!user) {
      throw new InternalServerErrorException('User not found in the request');
    }

    if (validRoles.includes(user.role)) return true;

    throw new ForbiddenException(`You dont have valid roles: ${validRoles}`);
  }
}
