import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { SignIpAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInAuthDto: SignIpAuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({
      where: { email: signInAuthDto.email },
      select: { id: true, email: true, password: true },
    });

    if (!user)
      throw new BadRequestException({
        message: 'email not found',
        statusCode: 400,
      });

    if (!bcrypt.compareSync(signInAuthDto.password, user.password)) {
      throw new NotFoundException({ message: 'email or password invalid' });
    }

    const payload = { sub: user.id, id: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(registerDto: SignUpAuthDto): Promise<User | undefined> {
    const user = await this.userService.findOne({
      where: { email: registerDto.email },
    });

    if (user)
      throw new BadRequestException({
        message: 'email in use',
        statusCode: 400,
      });

    const password = await bcrypt.hash(registerDto.password, 10);
    const newUser = { email: registerDto.email, password };

    return await this.userService.create(newUser);
  }
}
