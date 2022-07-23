import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from '../auth/dto/registration-user-dto';
import { PrismaService } from '../core/prisma.service';
import { FileService } from '../file/file.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
  ) {}

  public async createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  public async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async getUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  public async getByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email: email } });
  }

  public async updateUserById(
    file,
    user: Partial<User>,
    id: string,
  ): Promise<User> {
    try {
      const userFromDb = await this.getUserById(id);
      if (userFromDb === null) {
        throw new HttpException(`user with id ${id} was not found in Db`, 404);
      }

      const hashPassword = await bcrypt.hash(user.password, 10);

      if (file) {
        const img = await this.fileService.uploadFile(file);
        return this.prismaService.user.update({
          where: { id: Number(id) },
          data: { ...user, avatar: img.Location, age: Number(user.age), password: hashPassword },
        });
      }

      return this.prismaService.user.update({
        where: { id: Number(id) },
        data: {
          ...user,
          age: Number(user.age),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  public async deleteUserById(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
