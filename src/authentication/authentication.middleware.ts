import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers.authorization.split(' ');

    if (
      authorization.length === 0 ||
      authorization[0] !== 'Bearer' ||
      authorization[1].length === 0
    )
      throw new UnauthorizedException({ message: 'invalid authentication' });

    try {
      await this.jwtService.verify(authorization[1]);
      next();
    } catch (error) {
      throw new UnauthorizedException({ error: error });
    }
  }
}
