import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      where: { email, password },
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: UserEntity) {
    const { password, ...userData } = user;
    const payload = { email: user.email, sub: user.id };
    return {
      ...userData,
      access_token: this.jwtService.sign(payload),
    };
  }
}