import { HttpException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { PrismaService } from '../core/prisma.service';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: CreateRestaurantDto): Promise<Restaurant> {
    return this.prismaService.restaurant.create({ data });
  }

  public async getAll(): Promise<Restaurant[]> {
    return this.prismaService.restaurant.findMany();
  }

  public async getById(id: string): Promise<Restaurant> {
    return this.prismaService.restaurant.findUnique({
      where: { id: Number(id) },
    });
  }

  public async updateById(
    data: CreateRestaurantDto,
    id: string,
  ): Promise<Restaurant> {
    try {
      const restaurant = await this.getById(id);

      if (restaurant === null) {
        throw new HttpException(`No restaurant with ${id} id`, 404);
      }

      return this.prismaService.restaurant.update({
        where: { id: Number(id) },
        data: data,
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async deleteById(id: string): Promise<Restaurant> {
    try {
      const restaurant = await this.getById(id);

      if (restaurant === null) {
        throw new HttpException(`No restaurant with ${id} id`, 404);
      }

      return this.prismaService.restaurant.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
