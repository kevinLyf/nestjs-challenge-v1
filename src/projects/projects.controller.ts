import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(createProjectDto, req["user"]);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req["user"]);
  }
}
