import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(AuthorizedGuard)
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
