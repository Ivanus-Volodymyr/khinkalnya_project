import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocalityService } from './locality.service';
import { CreateLocalityDto } from './dto/create-locality-dto';

@Controller('locality')
export class LocalityController {
  constructor(private localityService: LocalityService) {}

  @Post()
  create(@Body() data: CreateLocalityDto) {
    return this.localityService.create(data);
  }

  @Get()
  getAll() {
    return this.localityService.getAll();
  }

  @Put('/:id')
  updateById(@Param('id') id: string, @Body() data: CreateLocalityDto) {
    return this.localityService.updateById(data, id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.localityService.deleteById(id);
  }
}
