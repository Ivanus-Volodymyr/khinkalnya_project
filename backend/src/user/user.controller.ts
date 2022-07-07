import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(AuthorizedGuard)
  getAllUsers() {
    return this.userService.getAll();
  }
}
