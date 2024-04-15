import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) return false;

    const authorization = request.headers.authorization.split(' ');

    if (
      authorization.length === 0 ||
      authorization[0] !== 'Bearer' ||
      authorization[1].length === 0
    )
      return false;

    try {
      const payload = await this.jwtService.verifyAsync(authorization[1]);

      const user = await this.userService.findOne({
        where: { id: payload.id },
      });

      request['user'] = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
