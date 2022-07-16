import {Body, Controller, Get, Post} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.getAll()
  }

  @Post()
  create(@Body() order: any) {
    return this.orderService.create(order);
  }
}
