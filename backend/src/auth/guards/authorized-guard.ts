import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthorizedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      console.log(authHeader);

      const bearer = authHeader.split(' ')[0];
      const accessToken = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !accessToken || accessToken=='') {
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          'UNAUTHORIZED',
        );
      }

      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
