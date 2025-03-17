import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { jwt } from '../interfaces/jwt.interface';

export const GetUser = createParamDecorator(
  (data: keyof jwt, context: ExecutionContext) => {
    const user: jwt = context.switchToHttp().getRequest().user;

    if (!user) {
      throw new InternalServerErrorException('User not found in the request!');
    }

    return !data ? user : user[data];
  },
);
