import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from '../auth/dto/registration-user-dto';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  public async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async getUserById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  public async getByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email: email } });
  }

  public async deleteUserById(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id: id } });
  }
}
