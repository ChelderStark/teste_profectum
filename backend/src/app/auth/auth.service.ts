import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AppError } from '@core/infra/error/app.error';
import { ReturnUser } from '@core/domain/entities/users.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: ReturnUser) {
    const payload: UserPayload = {
      sub: user.code,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const isPassValid = await bcrypt.compare(password, user.password);

      if (isPassValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new AppError(
      `Email address or password provided is incorrect.`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
