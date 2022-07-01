import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/registration-user-dto';
import { TokenService } from './token/token.service';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async registration(data: CreateUserDto) {
    try {
      const user = await this.userService.getByEmail(data.email);

      if (user) {
        return new HttpException(
          'user is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = await bcrypt.hash(data.password, 10);
      const savedUser = await this.userService.createUser({
        ...data,
        age: Number(data.age),
        password: hashPassword,
      });

      return this.tokenService.generateToken(savedUser);
    } catch (e) {
      console.log(e.message);
      return e.message[0];
    }
  }

  async login(data: LoginUserDto) {
    try {
      const userFromDb = await this._validate(data);

      if (userFromDb) {
        await this.tokenService.deleteTokenPair(userFromDb.id);
        return this.tokenService.generateToken(userFromDb);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async _validate(data: LoginUserDto) {
    try {
      const userFromDb = await this.userService.getByEmail(data.email);
      const checkPassword = await bcrypt.compare(
        data.password,
        userFromDb.password,
      );

      if (userFromDb && checkPassword) {
        return userFromDb;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
