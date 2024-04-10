import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);

    if (user?.password !== password) {
      throw new NotFoundException({ message: 'Email or password invalid!' });
    }

    const payload = { sub: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
