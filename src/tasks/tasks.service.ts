import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly projectService: ProjectsService) {}

  async findAll(id: number, user: User): Promise<Task[]> {
    const project = await this.projectService.findOne(id, user);

    if (!project) throw new BadRequestException({ message: 'project not found' });

    if (project.id !== user.id) throw new UnauthorizedException({ message: 'you are not owner' });

    return project.tasks;
  }
}
