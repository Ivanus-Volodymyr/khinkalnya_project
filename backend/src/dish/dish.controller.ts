import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Get()
  getAll() {
    return this.dishService.getAll();
  }

  @Get('locality/:id')
  getByLocalityId(@Param('id') id: string) {
    return this.dishService.getByLocalityId(id);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.dishService.getById(id);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateById(
    @UploadedFile() file,
    @Body() dish: Partial<Dish>,
    @Param('id') id: string,
  ) {
    return this.dishService.updateById(dish, id, file);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.dishService.deleteById(id);
  }
}
