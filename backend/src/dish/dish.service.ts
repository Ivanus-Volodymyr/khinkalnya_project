import {HttpException, Injectable} from '@nestjs/common';

import {PrismaService} from '../core/prisma.service';
import {FileService} from '../file/file.service';
import {Dish} from "@prisma/client";

@Injectable()
export class DishService {
    constructor(
        private fileService: FileService,
        private prismaService: PrismaService,
    ) {
    }

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
                        restaurantId: Number(dish.restaurantId)
                    }
                })
            }
            // return this.prismaService.dish.create({
            //   data: {
            //     ...dish,
            //     weight: Number(dish.weight),
            //     price: Number(dish.price),
            //     localityId: Number(dish.localityId),
            //     // orderId: Number(dish.orderId),
            //     // restaurantId: Number(dish.restaurantId),
            //   },
            // });
        } catch (e) {
            throw new HttpException(e.message, 404);
        }
    }
}


// return this.prismaService.dish.create({
//     data: {
//         ...dish,
//         image: img.Location,
//         weight: Number(dish.weight),
//         price: Number(dish.price),
//         locality: {connect: { id: CreateDishDto["localityId"] }},
//         order: {connect: { id: CreateDishDto["orderId"] }},
//         restaurant: {connect: { id: CreateDishDto["restaurantId"] }},
//     }
// })
