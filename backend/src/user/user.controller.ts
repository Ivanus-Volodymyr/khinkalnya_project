import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {User} from "@prisma/client";

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

  @Put('/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  updateUserById(
    @UploadedFile() file,
    @Body() user: Partial<User>,
    @Param('id') id: string,
  ) {
    return this.userService.updateUserById(file, user, id);
  }
}
