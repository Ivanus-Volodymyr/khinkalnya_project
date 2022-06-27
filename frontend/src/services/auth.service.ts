import {axiosServices} from "./axios.service";
import {urls} from "../constans";
import {IUser} from "../interfaces";

export const authService = {
    registration: (data: IUser) => axiosServices.post(urls.registration, data),
    login: (data: Partial<IUser>)=> axiosServices.post(urls.login, data)
}
