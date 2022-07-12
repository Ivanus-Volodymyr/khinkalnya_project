import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Dish } from '@prisma/client';

import { DishService } from './dish.service';
@Controller('dish')
export class DishController {
  constructor(private dishService: DishService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file, @Body() data: Dish) {
    return this.dishService.create(data, file);
  }
}
