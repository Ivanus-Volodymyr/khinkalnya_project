import { Module } from '@nestjs/common';

import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { PrismaService } from '../core/prisma.service';

@Module({
  controllers: [DishController],
  providers: [DishService, FileService, PrismaService],
  imports: [FileModule],
})
export class DishModule {}
