import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Injectable()
export class HandleError {
  private logger: Logger;

  setServiceName(serviceName: string) {
    this.logger = new Logger(serviceName);
  }
  error(error: unknown) {
    this.logger?.error(error);
    console.error(error);

    if (error instanceof QueryFailedError) {
      const message = `PostgreSQL Error: ${error.message} -- ${error.driverError?.detail}`;
      throw new BadRequestException(message);
    }

    if (error instanceof TypeORMError) {
      const message = `TypeORMError: ${error.message}`;
      throw new BadRequestException(message);
    }

    if (error instanceof Error && error.name === 'EntityNotFound') {
      throw new BadRequestException('Entity not found');
    }

    if (error instanceof TypeError) {
      throw new BadRequestException(error.message);
    }

    if (typeof error === 'string') {
      throw new BadRequestException(error);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
