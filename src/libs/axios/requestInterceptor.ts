import { InternalAxiosRequestConfig } from "axios";
import Token from "src/libs/token";
import { ACCESS_TOKEN, REQUEST_TOKEN } from "src/constants/token/token";

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    const token = await Token.getToken(ACCESS_TOKEN);
    if (token && config.headers) {
        config.headers[REQUEST_TOKEN] = `Bearer ${token}`;
    }
    return config;
};