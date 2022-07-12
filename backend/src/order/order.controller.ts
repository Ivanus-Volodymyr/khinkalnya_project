import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() order: any) {
    return this.orderService.create(order);
  }
}
