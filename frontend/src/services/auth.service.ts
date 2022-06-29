import {axiosServices} from "./axios.service";
import {urls} from "../constans";
import {IAuthResponse, IUser} from "../interfaces";

export const authService = {
    registration: (data: IUser) => axiosServices.post<IAuthResponse>(urls.registration, data),
    login: (data: Partial<IUser>) => axiosServices.post<IAuthResponse>(urls.login, data)
}
