import {IUser} from "../interfaces";
import {axiosServices} from "./axios.service";
import {urls} from "../constans";


export const userService = {
    getAllUsers: (accessToken: string) => axiosServices.get<IUser[]>(urls.getUsers, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }),
}
