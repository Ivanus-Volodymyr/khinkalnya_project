import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
  imports: []
})
export class ReviewModule {}
