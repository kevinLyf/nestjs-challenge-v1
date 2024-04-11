import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const project: Project =
      await this.projectRepository.create(createProjectDto);

    project.users = [user];

    return await this.projectRepository.save(project);
  }

  async findAll(user: User): Promise<Project[]> {
    return await this.projectRepository.find({
      where: {
        users: {
          id: user.id,
        },
      },

      relations: {
        users: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.find({ where: { id } });

    if (project.length === 0)
      throw new BadRequestException({ message: 'project not found' });

    return await this.projectRepository.update(id, updateProjectDto);
  }
}
