import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.headers.authorization) throw new UnauthorizedException({ message: 'invalid authentication' });

    const authorization = req.headers.authorization.split(' ');

    if (authorization.length === 0 || authorization[0] !== 'Bearer' || authorization[1].length === 0)
      throw new UnauthorizedException({ message: 'invalid authentication' });

    try {
      const payload = await this.jwtService.verifyAsync(authorization[1]);

      const user = await this.userService.findOne({
        where: { id: payload.id },
      });

      req['user'] = user;

      next();
    } catch (error) {
      throw new UnauthorizedException({ error: error });
    }
  }
}
