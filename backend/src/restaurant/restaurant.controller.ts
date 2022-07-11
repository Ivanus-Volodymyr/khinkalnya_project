import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Post()
  createRestaurant(@Body() data: CreateRestaurantDto) {
    return this.restaurantService.create(data);
  }

  @Get()
  getAll() {
    return this.restaurantService.getAll();
  }

  @Put('/:id')
  updateById(@Param('id') id: string, @Body() data: CreateRestaurantDto) {
    return this.restaurantService.updateById(data, id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.restaurantService.deleteById(id);
  }
}
