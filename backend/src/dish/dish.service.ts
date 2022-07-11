import { HttpException, Injectable } from '@nestjs/common';
import { Dish } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class DishService {
  constructor(
    private fileService: FileService,
    private prismaService: PrismaService,
  ) {}

  public async create(file, dish: Dish): Promise<Dish> {
    try {
      if (file) {
        const img = await this.fileService.uploadFile(file);

        return this.prismaService.dish.create({
          data: {
            ...dish,
            image: img.Location,
            weight: Number(dish.weight),
            price: Number(dish.price),
            localityId: Number(dish.localityId),
            orderId: Number(dish.orderId),
            restaurantId: Number(dish.restaurantId),
          },
        });
      }
      return this.prismaService.dish.create({
        data: {
          ...dish,
          weight: Number(dish.weight),
          price: Number(dish.price),
          localityId: Number(dish.localityId),
          orderId: Number(dish.orderId),
          restaurantId: Number(dish.restaurantId),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
