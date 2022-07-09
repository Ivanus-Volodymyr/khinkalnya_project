import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccessTokenMiddleware } from './auth/middlewares/access_token-middleware';
import { TokenService } from './auth/token/token.service';
import { PrismaService } from './core/prisma.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule, FileModule],
  controllers: [],
  providers: [TokenService, PrismaService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AccessTokenMiddleware).forRoutes('users');
  }
}
