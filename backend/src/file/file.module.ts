import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [FileService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class FileModule {}
