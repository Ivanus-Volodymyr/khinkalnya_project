import { HttpException, Injectable } from '@nestjs/common';

import { PrismaService } from '../core/prisma.service';
import { FileService } from '../file/file.service';
import { Dish } from '@prisma/client';

@Injectable()
export class DishService {
  constructor(
    private fileService: FileService,
    private prismaService: PrismaService,
  ) {}

  public async create(dish: Dish, file): Promise<Dish> {
    try {
      if (file) {
        const img = await this.fileService.uploadFile(file);
        return this.prismaService.dish.create({
          data: {
            ...dish,
            image: img.Location,
            price: Number(dish.price),
            weight: Number(dish.weight),
            localityId: Number(dish.localityId),
            restaurantId: Number(dish.restaurantId),
          },
        });
      }

      return this.prismaService.dish.create({
        data: {
          ...dish,
          price: Number(dish.price),
          weight: Number(dish.weight),
          localityId: Number(dish.localityId),
          restaurantId: Number(dish.restaurantId),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async getAll(): Promise<Dish[]> {
    return this.prismaService.dish.findMany();
  }

  public async getById(id: string): Promise<Dish> {
    return this.prismaService.dish.findUnique({ where: { id: Number(id) } });
  }

  public async getByLocalityId(id: string): Promise<Dish[]> {
    return this.prismaService.dish.findMany({
      where: { localityId: Number(id) },
    });
  }

  public async updateById(dish: Partial<Dish>, id: string, file): Promise<Dish> {
    try {
      const locality = await this.getById(id);
      if (locality === null) {
        throw new HttpException(`no such locality with id ${id}`, 404);
      }

      if (file){
        const img = await this.fileService.uploadFile(file);

        return this.prismaService.dish.update({
          where: { id: Number(id) },
          data: {
            ...dish,
            image: img.Location,
            price: Number(dish.price),
            weight: Number(dish.weight),
            localityId: Number(dish.localityId),
            restaurantId: Number(dish.restaurantId),
          },
        });
      }

      return this.prismaService.dish.update({
        where: { id: Number(id) },
        data: {
          ...dish,
          price: Number(dish.price),
          weight: Number(dish.weight),
          localityId: Number(dish.localityId),
          restaurantId: Number(dish.restaurantId),
        },

      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async deleteById(id: string): Promise<Dish> {
    return this.prismaService.dish.delete({ where: { id: Number(id) } });
  }
}
