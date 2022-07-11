import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
