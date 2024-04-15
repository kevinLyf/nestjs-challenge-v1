import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<Project>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const id = request.params.id;
    const user = request['user'];

    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!project) throw new BadRequestException({ message: 'project not found' });

    if (project.user.id !== user.id)
      throw new UnauthorizedException({ message: 'you are not owner' });

    return true;
  }
}
