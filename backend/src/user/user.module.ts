import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../core/prisma.service';
import { FileService } from '../file/file.service';

@Module({
  providers: [UserService, PrismaService, FileService],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
