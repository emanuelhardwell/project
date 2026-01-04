import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ACCESS_LEVEL, ROLES } from '../enums/roles.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { AccessLevelProtected } from '../auth/decorators/access-level-protected.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth()
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: UserEntity,
  ) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @AccessLevelProtected(ACCESS_LEVEL.MANTEINER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
