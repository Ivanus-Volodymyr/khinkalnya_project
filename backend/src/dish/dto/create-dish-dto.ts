import { IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  image: string;
  @IsString()
  name: string;
  price: number;
  weight: number;
  @IsString()
  description: string;
  localityId?: number;
  quantity_sold?: number;
  ingredients?: [];
  order?: [];
  restaurantId?: number;
}
