import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [LocalityService, PrismaService],
  controllers: [LocalityController],
})
export class LocalityModule {}
