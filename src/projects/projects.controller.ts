import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';
import { ProjectOwnerGuard } from '../guards/project-owner/project-owner.guard';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { TasksService } from '../tasks/tasks.service';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { ProjectsService } from '../projects/projects.service';

@UseGuards(AuthenticationGuard)
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
  @UseGuards(ProjectOwnerGuard)
  findOne(@Param(':id') id: number, @Req() req) {
    return this.projectsService.findOne(id, req['user']);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req['user']);
  }

  @Put(':id')
  @UseGuards(ProjectOwnerGuard)
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Get(':id/tasks')
  @UseGuards(ProjectOwnerGuard)
  findTasks(@Param('id') id: number, @Req() req) {
    return this.taskService.findAll(id, req['user']);
  }

  @Post(':id/tasks')
  @UseGuards(ProjectOwnerGuard)
  createTask(@Param('id') id: number, @Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(id, createTaskDto, req['user']);
  }

  @Put(':projectId/tasks/:taskId')
  @UseGuards(ProjectOwnerGuard)
  updateTask(
    @Body() updateTaskDto: CreateTaskDto,
    @Param('projectId') projectId: number,
    @Param('taskId') taskId: number,
    @Req() req,
  ) {
    return this.taskService.update(projectId, taskId, updateTaskDto, req['user']);
  }

  @Delete(':id')
  @UseGuards(ProjectOwnerGuard)
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }

  @Delete(':projectId/tasks/:taskId')
  @UseGuards(ProjectOwnerGuard)
  removeTask(@Param('projectId') projectId: number, @Param('taskId') taskId: number, @Req() req) {
    return this.taskService.remove(projectId, taskId, req['user']);
  }
}
