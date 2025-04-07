import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL } from '../../enums/roles.enum';

export const METADATA_ACCESS_LEVEL: string = 'access_level';

export const AccessLevelProtected = (args?: ACCESS_LEVEL) =>
  SetMetadata(METADATA_ACCESS_LEVEL, args);
