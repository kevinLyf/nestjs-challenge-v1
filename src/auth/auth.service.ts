import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(): Promise<{ access_token: string }> {
    const payload = { sub: 1 /* ID */, email: '@test.com' /* EMAIL */ };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
