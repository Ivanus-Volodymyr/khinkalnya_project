import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {LoggerMiddleware} from "./auth/middlewares/access_token-middleware";
import {TokenService} from "./auth/token/token.service";
import {PrismaService} from "./core/prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  imports: [AuthModule, UserModule, JwtModule],
  controllers: [],
  providers: [TokenService, PrismaService, JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('users');
  }

}
