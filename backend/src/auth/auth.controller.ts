import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/registration-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiBody({
    schema: {
      example: {
        email: 'string',
        name: 'string',
        age: 'integer',
        city: 'string',
        password: 'string',
        status: 'boolean',
      },
    },
  })
  @ApiCreatedResponse({
    status: 201,
    schema: {
      example: {
        user: {
          id: 'number',
          email: 'string',
          name: 'string',
          age: 'integer',
          city: 'string',
          password: 'string',
          status: 'boolean',
          posts: 'Posts[]',
          comments: 'Comment[]',
        },
        tokenPair: {
          access_token: 'string',
          refresh_token: 'string',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user);
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({
    schema: {
      example: {
        email: 'string',
        password: 'string',
      },
    },
  })
  @ApiCreatedResponse({
    status: 200,
    schema: {
      example: {
        user: {
          id: 'number',
          email: 'string',
          name: 'string',
          age: 'integer',
          city: 'string',
          password: 'string',
          status: 'boolean',
          posts: 'Posts[]',
          comments: 'Comment[]',
        },
        tokenPair: {
          access_token: 'string',
          refresh_token: 'string',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Req() request, @Body() body) {
    return this.authService.refresh(body.data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() request) {
    const accessToken = request.headers.authorization.split(' ')[1];
    return this.authService.logout(accessToken);
  }
}
