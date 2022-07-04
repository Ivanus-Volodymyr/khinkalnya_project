import {CanActivate, ExecutionContext, HttpStatus, UnauthorizedException,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {TokenService} from "../token/token.service";
import {TokenPair} from "@prisma/client";

export class AuthorizedGuard implements CanActivate {
    constructor(private tokenService: TokenService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            console.log(request.headers);
            const authHeader = request.headers.authorization;
            const userId = request.headers.userid;

            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];

            const token = await this._validateToken(userId);
            console.log(token);


            if (bearer !== 'Bearer' || accessToken === 'undefined') {
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

    private async _validateToken(id: string) {
       return this.tokenService.getTokenPairByUserId(id);
    }
}
