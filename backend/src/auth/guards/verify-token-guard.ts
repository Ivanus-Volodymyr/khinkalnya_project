import {TokenService} from "../token/token.service";
import {JwtService} from "@nestjs/jwt";

export class VerifyTokenGuard {
    constructor(private tokenService: TokenService,
                private jwtService: JwtService) {}

    async verify(): Promise<boolean> {
        const q = await this.tokenService.getTokenPairByUserId(1);
        if (q){
            console.log(q);
            return true
        }
    }
}
