import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../../enums/roles.enum';

export const METADATA_ROL: string = 'roles';

export const RoleProtected = (...args: ROLES[]) =>
  SetMetadata(METADATA_ROL, args);
