import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { UserService } from '../users/users.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

const projectServiceMock = {
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findTasks: jest.fn(),
};

const taskServiceMock = {
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const userServiceMock = {
  create: jest.fn(),
  findOne: jest.fn(),
  findOneById: jest.fn(),
};

const jwtServiceMock = {};

const projectRepositoryMock = {
  /* mock implementation of ProjectRepository methods */
};

const taskRepository = getRepositoryToken(Task);

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        UserService,
        TasksService,
        {
          provide: TasksService,
          useValue: taskServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: ProjectsService,
          useValue: projectServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: Repository,
          useValue: projectRepositoryMock,
          useClass: Repository,
        },
        {
          provide: 'ProjectRepository',
          useValue: projectRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
