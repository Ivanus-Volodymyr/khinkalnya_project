import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocalityService } from './locality.service';
import { CreateLocalityDto } from './dto/create-locality-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locality')
export class LocalityController {
  constructor(private localityService: LocalityService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file, @Body() data: CreateLocalityDto) {
    return this.localityService.create(data, file);
  }

  @Get()
  getAll() {
    return this.localityService.getAll();
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateById(
    @UploadedFile() file,
    @Param('id') id: string,
    @Body() data: CreateLocalityDto,
  ) {
    return this.localityService.updateById(file, data, id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.localityService.deleteById(id);
  }
}
