import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticationGuard({} as JwtService, {} as UserService)).toBeDefined();
  });
});
