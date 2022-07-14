import {IUser} from "../interfaces";
import {axiosServices} from "./axios.service";
import {urls} from "../constans";


export const userService = {
    getAllUsers: () => axiosServices.get<IUser[]>(urls.getUsers),
    getUserById:(id: string)=> axiosServices.get<IUser>(urls.getUsers + `/${id}`)
}
