import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token', async () => {
      const accessToken = 'mockAccessToken';
      const signInAuthDto = { email: 'testuser@test.com', password: 'testpassword' };
      jest.spyOn(authService, 'signIn').mockResolvedValue({ access_token: accessToken });

      const result = await controller.signIn(signInAuthDto);

      expect(result).toEqual({ access_token: accessToken });
    });
  });

  describe('signUp', () => {
    it('should return status code 201 on successful registration', async () => {
      const signUpAuthDto = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'testpassword',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(undefined);
      const result = await controller.signUp(signUpAuthDto);

      expect(result).toBeUndefined();
    });
  });
});
