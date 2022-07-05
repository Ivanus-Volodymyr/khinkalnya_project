import {HttpStatus, Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {TokenService} from "../token/token.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private tokenService: TokenService) {
    }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const bearer = req.headers.authorization.split(' ')[0];
            const access_token = req.headers.authorization.split(' ')[1];
            console.log(access_token);

            if (!bearer || !access_token) {
                throw new UnauthorizedException(
                    HttpStatus.UNAUTHORIZED,
                    'UNAUTHORIZED',
                );
            }

            const tokenPayload = await this.tokenService.verifyToken(access_token, 'ACCESS');
            const tokenPairFromDb = await this.tokenService.getTokenPairByUserId(tokenPayload.id);
            console.log(tokenPayload);
            console.log(tokenPairFromDb);
            next();
        } catch (e) {
            console.log(e);
        }

    }
}
