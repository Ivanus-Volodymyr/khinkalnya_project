import {ITokenPair} from "./tokenPair.interface";

export interface IInitialState {
    access_token: string,
    error: string,
    active: boolean,
    user: null,
    tokenPair: ITokenPair,
    refresh_token: string;
}
