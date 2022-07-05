import {Controller, Get, Req, UseGuards} from '@nestjs/common';


import { UserService } from './user.service';
import { AuthorizedGuard } from '../auth/guards/authorized-guard';
import {TokenService} from "../auth/token/token.service";
import {JwtService} from "@nestjs/jwt";
import {VerifyTokenGuard} from "../auth/guards/verify-token-guard";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthorizedGuard)
  @UseGuards(VerifyTokenGuard)
  getAllUsers(@Req() request) {
    return this.userService.getAll();
  }
}
