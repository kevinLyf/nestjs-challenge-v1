import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectOwnerGuard } from './project-owner.guard';

describe('ProjectOwnerGuard', () => {
  it('should be defined', () => {
    expect(new ProjectOwnerGuard({} as Repository<Project>)).toBeDefined();
  });
});
