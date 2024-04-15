import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';

const authServiceMock = {
  signIn: jest.fn(),
  signUp: jest.fn(),
};

const userServiceMock = {
  create: jest.fn(),
  findOne: jest.fn(),
  findOneById: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
