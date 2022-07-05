import {CanActivate, ExecutionContext, HttpStatus, UnauthorizedException,} from '@nestjs/common';
import {Observable} from "rxjs";

export class AuthorizedGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ):  boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const userId = Number(request.headers.userid);

            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];

            // console.log(authHeader);
            // console.log(userId);
            //
            // const tokenPairByUserId =  this.tokenService.getTokenPairByUserId(1);
            // console.log(tokenPairByUserId);
            //
            if (bearer !== 'Bearer' || accessToken === 'undefined' || !accessToken) {
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
