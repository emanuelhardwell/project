import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UsersModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
