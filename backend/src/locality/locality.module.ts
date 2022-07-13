import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { PrismaService } from '../core/prisma.service';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  providers: [LocalityService, PrismaService, FileService],
  controllers: [LocalityController],
  imports: [FileModule],
})
export class LocalityModule {}
