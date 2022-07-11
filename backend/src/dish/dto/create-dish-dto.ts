import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsOptional()
  public image?: string;
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsNumber()
  @IsNotEmpty()
  public price: number;
  @IsNumber()
  @IsNotEmpty()
  public weight?: number;
  @IsString()
  @IsNotEmpty()
  public description: string;
  @IsNumber()
  @IsOptional()
  public quantity_sold?: number;
  @IsNumber()
  @IsOptional()
  public localityId?: number;
  @IsNumber()
  @IsOptional()
  public orderId?: number;
  @IsNumber()
  @IsOptional()
  public restaurantId?: number;
  @IsOptional()
  public order?: [];
  @IsOptional()
  public ingredients?: [];
  @IsOptional()
  public locality?: [];
  @IsOptional()
  public Restaurant?:[]
}
