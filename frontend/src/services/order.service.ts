import {axiosServices} from "./axios.service";
import {urls} from "../constans";

export const orderService = {
    getAll: () => axiosServices.get<any>(urls.getOrders)
}
