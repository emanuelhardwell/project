import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: keyof IUser, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as IUser;

    if (!user) {
      throw new InternalServerErrorException('User not found in the request!');
    }

    return !data ? user : user[data];
  },
);
