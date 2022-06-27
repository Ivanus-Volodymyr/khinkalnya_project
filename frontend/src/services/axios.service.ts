import axios from "axios";

import apiUrl from "../constans/urls";

export const axiosServices = axios.create({baseURL: apiUrl});
