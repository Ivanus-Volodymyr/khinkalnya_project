import {ITokenPair} from "./tokenPair.interface";

export interface IInitialState {
    access_token: string,
    active: boolean,
    user: null,
    tokenPair: ITokenPair,
}
