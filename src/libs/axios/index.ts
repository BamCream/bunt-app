import axios, { AxiosRequestConfig } from "axios";
import { requestInterceptor } from "./requestInterceptor";
import { responseErrorInterceptor } from "./responseErrorInterceptor";
import { REQUEST_TOKEN, ACCESS_TOKEN } from "src/constants/token/token";
import Token from "src/libs/token";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const createCustomAxiosInstance = (baseURL?: AxiosRequestConfig) => {
    const baseConfig: AxiosRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    return axios.create({
        ...baseConfig,
        ...baseURL,
        withCredentials: true,
    });
};

export const BuntAxios = createCustomAxiosInstance({
    baseURL: SERVER_URL,
    headers: {
        [REQUEST_TOKEN]: `Bearer ${Token.getToken(ACCESS_TOKEN)}`!,
    },
});

BuntAxios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

BuntAxios.interceptors.response.use((res) => res, responseErrorInterceptor);

export default BuntAxios;