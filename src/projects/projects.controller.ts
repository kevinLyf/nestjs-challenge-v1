import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly taskService: TasksService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(createProjectDto, req['user']);
  }

  @Get(':id')
  findOne(@Param(':id') id: number, @Req() req) {
    return this.projectsService.findOne(id, req['user']);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req['user']);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto, @Req() req) {
    return this.projectsService.update(id, updateProjectDto, req['user']);
  }

  @Get(':id/tasks')
  findTasks(@Param('id') id: number, @Req() req) {
    return this.taskService.findAll(id, req['user']);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.projectsService.remove(id, req['user']);
  }
}
