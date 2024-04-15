import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const project: Project = await this.projectRepository.create(createProjectDto);
    project.user = user;

    return await this.projectRepository.save(project);
  }

  async findOne(id: number, user: User): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },

      relations: {
        tasks: true,
        user: true,
      },
    });
  }

  async findAll(user: User): Promise<Project[]> {
    return await this.projectRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },

      relations: {
        user: true,
        tasks: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<{ message: string }> {
    await this.projectRepository.update(id, updateProjectDto);
    return { message: 'project successfully updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.projectRepository.delete({ id });
    return { message: 'project successfully deleted' };
  }

  async findTasks(id: number): Promise<Task[] | []> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true, tasks: true },
    });
    return project.tasks ?? [];
  }
}
