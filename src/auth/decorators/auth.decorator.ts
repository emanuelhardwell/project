import { applyDecorators, UseGuards } from '@nestjs/common';
import { ROLES } from '../../enums/roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { AccessLevelGuard } from '../guards/access-level.guard';

export const Auth = (...roles: ROLES[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard, AccessLevelGuard),
  );
};
