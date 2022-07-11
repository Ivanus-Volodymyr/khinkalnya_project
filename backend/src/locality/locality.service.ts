import { HttpException, Injectable } from '@nestjs/common';
import { Locality } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';
import { CreateLocalityDto } from './dto/create-locality-dto';

@Injectable()
export class LocalityService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: CreateLocalityDto): Promise<Locality> {
    return this.prismaService.locality.create({ data });
  }

  public async getAll(): Promise<Locality[]> {
    return this.prismaService.locality.findMany();
  }

  public async getById(id: string): Promise<Locality> {
    return this.prismaService.locality.findUnique({
      where: { id: Number(id) },
    });
  }

  public async updateById(
    data: CreateLocalityDto,
    id: string,
  ): Promise<Locality> {
    try {
      const locality = await this.getById(id);
      if (locality === null) {
        throw new HttpException(`No such locality with id ${id}`, 404);
      }

      return this.prismaService.locality.update({
        where: { id: Number(id) },
        data: data,
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async deleteById(id: string): Promise<Locality> {
    try {
      const locality = await this.getById(id);
      if (locality === null) {
        throw new HttpException(`No such locality with id ${id}`, 404);
      }

      return this.prismaService.locality.delete({ where: { id: Number(id) } });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
