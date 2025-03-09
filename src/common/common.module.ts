import { Module } from '@nestjs/common';
import { HandleError } from './errors/handle-error';

@Module({
  exports: [HandleError],
  providers: [HandleError],
})
export class CommonModule {}
