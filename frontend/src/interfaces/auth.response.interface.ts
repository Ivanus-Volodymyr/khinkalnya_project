import {IUserResponse} from "./user.interface";
import {ITokenPair} from "./tokenPair.interface";

export interface IAuthResponse {
    user: IUserResponse;
    tokenPair: ITokenPair;
}
