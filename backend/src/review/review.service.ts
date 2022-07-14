import { HttpException, Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  public async create(review: Review): Promise<Review> {
    return this.prismaService.review.create({
      data: {
        ...review,
        rating: Number(review.rating),
      },
    });
  }

  public async getAll(): Promise<Review[]> {
    return this.prismaService.review.findMany();
  }

  public async getById(id: string): Promise<Review> {
    return this.prismaService.review.findUnique({ where: { id: Number(id) } });
  }

  public async getByUserId(id: string): Promise<Review[]> {
    return this.prismaService.review.findMany({
      where: { userId: Number(id) },
    });
  }

  public async updateById(
    review: Partial<Review>,
    id: string,
  ): Promise<Review> {
    try {
      const review = await this.getById(id);
      if (review === null) {
        throw new HttpException(`No such review with id ${id}`, 404);
      }

      return this.prismaService.review.update({
        where: { id: Number(id) },
        data: {
          ...review,
          rating: Number(review.rating),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async deleteById(id: string): Promise<Review> {
    try {
      const review = await this.getById(id);
      if (review === null) {
        throw new HttpException(`No such review with id ${id}`, 404);
      }

      return this.prismaService.review.delete({ where: { id: Number(id) } });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
