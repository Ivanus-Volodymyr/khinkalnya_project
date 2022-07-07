import axios from "axios";

import apiUrl from "../constans/urls";
import {authService} from "./auth.service";

export const axiosServices = axios.create({baseURL: apiUrl});



//custom request and response interceptor for axios
export const updateHeaderInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use((request: any) => {
        const access = localStorage.getItem('access_token');
        request.headers = {
            Authorization: `Bearer ${access}`
        }
        return request;
    })
}

export const errorInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use((response: any) => {
        return response;
    }, async (error: any) => {
        const originalConfig = error.config;
        if (error.response.data.statusCode === 401) {
            originalConfig._retry = true
            const refresh_token = await localStorage.getItem('refresh_token') as string
            const promise = await authService.refresh(refresh_token);

            const tokenPair = promise.data.tokenPair;

            await localStorage.setItem('access_token', tokenPair.access_token)
            await localStorage.setItem('refresh_token', tokenPair.refresh_token)

            return axiosServices(originalConfig)
        }
    });
};

errorInterceptor(axiosServices);
updateHeaderInterceptor(axiosServices);


