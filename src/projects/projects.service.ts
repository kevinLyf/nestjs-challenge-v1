import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async update(id: number, updateProjectDto: UpdateProjectDto, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!project) throw new BadRequestException({ message: 'project not found' });

    if (project.user.id !== user.id) throw new UnauthorizedException({ message: 'you are not owner' });

    await this.projectRepository.update(id, updateProjectDto);
    return { message: 'project successfully updated' };
  }

  async remove(id: number, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!project) throw new BadRequestException({ message: 'project not found' });

    if (project.user.id !== user.id) throw new UnauthorizedException({ message: 'you are not owner' });

    await this.projectRepository.delete({ id });

    return { message: 'project successfully deleted' };
  }

  async findTasks(id: number, user: User) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true, tasks: true },
    });

    if (!project) throw new BadRequestException({ message: 'project not found' });

    if (project.user.id !== user.id) throw new UnauthorizedException({ message: 'you are not owner' });

    return project.tasks ?? [];
  }
}
