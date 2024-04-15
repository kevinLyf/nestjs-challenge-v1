import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

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
