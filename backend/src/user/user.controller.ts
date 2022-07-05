import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthorizedGuard } from '../auth/guards/authorized-guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthorizedGuard)
  getAllUsers(@Req() request) {
    return this.userService.getAll();
  }
}
