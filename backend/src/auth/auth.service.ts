import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

      if (!userFromDb) {
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          'wrong email or password',
        );
      }

      if (userFromDb) {
        const tokenPairFromDb = await this.tokenService.getTokenPairByUserId(
          userFromDb.id,
        );

        if (tokenPairFromDb) {
          await this.tokenService.deleteTokenPair(userFromDb.id);
        }

        return this.tokenService.generateToken(userFromDb);
      }
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  private async _validate(data: LoginUserDto) {
    try {
      const userFromDb = await this.userService.getByEmail(data.email);

      if (userFromDb === null) {
        throw new HttpException('wrong email or password', 404);
      }

      const checkPassword = await bcrypt.compare(
        data.password,
        userFromDb.password,
      );

      if (userFromDb && checkPassword) {
        return userFromDb;
      }

      throw new HttpException('wrong email or password', 404);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  async refresh(refreshToken: string) {
    try {
      const tokenPayload = await this.tokenService.verifyToken(
        refreshToken,
        'REFRESH',
      );
      const tokenPairByUserId = await this.tokenService.getTokenPairByUserId(
        tokenPayload.id,
      );
      if (!tokenPayload || refreshToken !== tokenPairByUserId.refresh_token) {
        return new HttpException('token not valid', HttpStatus.BAD_REQUEST);
      }

      await this.tokenService.deleteTokenPair(tokenPayload.id);

      return this.tokenService.generateToken(tokenPayload);
    } catch (e) {
      console.log(e);
    }
  }

  async logout(accessToken: string) {
    try {
      const tokenPayload = await this.tokenService.verifyToken(
        accessToken,
        'ACCESS',
      );
      console.log(tokenPayload);

      if (!tokenPayload) {
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          'access token not valid',
        );
      }

      return this.tokenService.deleteTokenPair(tokenPayload.id);
    } catch (e) {
      console.log(e);
    }
  }
}
