import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import {PrismaService} from "../core/prisma.service";

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {
    }
    public async create(order: any): Promise<Order> {
        return this.prismaService.order.create(order)
    }
}
