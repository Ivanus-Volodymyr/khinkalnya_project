import { HttpException, Injectable } from '@nestjs/common';
import { Locality } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';
import { CreateLocalityDto } from './dto/create-locality-dto';
import { FileService } from '../file/file.service';

@Injectable()
export class LocalityService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
  ) {}

  public async create(locality: CreateLocalityDto, file): Promise<Locality> {
    try {
      if (file) {
        const img = await this.fileService.uploadFile(file);
        return this.prismaService.locality.create({
          data: {
            ...locality,
            image: img.Location,
          },
        });
      }

      return this.prismaService.locality.create({ data: locality });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async getAll(): Promise<Locality[]> {
    return this.prismaService.locality.findMany({ include: { dish: true } });
  }

  public async getById(id: string): Promise<Locality> {
    return this.prismaService.locality.findUnique({
      where: { id: Number(id) },
    });
  }

  public async updateById(
    file,
    localityData: CreateLocalityDto,
    id: string,
  ): Promise<Locality> {
    try {
      const locality = await this.getById(id);
      if (locality === null) {
        throw new HttpException(`No such locality with id ${id}`, 404);
      }

      if (file) {
        const img = await this.fileService.uploadFile(file);

        return this.prismaService.locality.update({
          where: { id: Number(id) },
          data: {
            ...localityData,
            image: img.Location,
          },
        });
      }

      return this.prismaService.locality.update({
        where: { id: Number(id) },
        data: localityData,
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
