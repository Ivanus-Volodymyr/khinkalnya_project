import {axiosServices} from "./axios.service";

import {urls} from "../constans";
import {ILocality} from "../interfaces/locality.interface";

export const localityService = {
    getAll: () => axiosServices.get<ILocality[]>(urls.getLocality)
}
