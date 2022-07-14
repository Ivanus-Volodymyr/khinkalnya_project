import {ITokenPair} from "./tokenPair.interface";
import {IUser} from "./user.interface";

export interface IInitialState {
    access_token: string,
    status: string,
    error : string,
    active: boolean,
    user: null,
    users:IUser[],
    tokenPair: ITokenPair,
    refresh_token: string;
}
