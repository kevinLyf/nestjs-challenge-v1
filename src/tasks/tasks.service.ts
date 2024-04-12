import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private readonly projectService: ProjectsService,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(id: number, user: User): Promise<Task[]> {
    const project = await this.projectService.findOne(id, user);

    if (!project) throw new BadRequestException({ message: 'project not found' });
    if (project.user.id !== user.id)
      throw new UnauthorizedException({ message: 'you are not owner' });

    const tasks = await this.taskRepository.find({
      where: {
        project: { id: project.id },
      },
    });

    return tasks;
  }

  async create(id: number, createTaskDto: CreateTaskDto, user: User) {
    const project = await this.projectService.findOne(id, user);

    if (!project) throw new BadRequestException({ message: 'project not found' });
    if (project.user.id !== user.id)
      throw new UnauthorizedException({ message: 'you are not owner' });

    const task = createTaskDto;
    task.project = project;

    return await this.taskRepository.save(task);
  }

  async remove(projectId: number, taskId: number, user: User): Promise<{ message: string }> {
    const project = await this.projectService.findOne(projectId, user);

    if (!project) throw new BadRequestException({ message: 'project not found' });
    if (project.user.id !== user.id)
      throw new UnauthorizedException({ message: 'you are not owner' });

    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    if (!task) throw new BadRequestException({ message: 'this task not exists' });

    await this.taskRepository.remove(task);

    return { message: 'task successfully deleted' };
  }
}
