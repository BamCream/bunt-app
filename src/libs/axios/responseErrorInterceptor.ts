import axios, { AxiosError } from "axios";
import Token from "src/libs/token";
import { ACCESS_TOKEN, REFRESH_TOKEN, REQUEST_TOKEN } from "src/constants/token/token";
import { refresh } from "src/apis/auth/auth.api";
import { router } from "expo-router";
import { errorHandler } from "./errorHandler";

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshQueue.forEach((cb) => cb(token));
    refreshQueue = [];
};

export const responseErrorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
        const accessToken = await Token.getToken(ACCESS_TOKEN);
        const refreshToken = await Token.getToken(REFRESH_TOKEN);

        if (accessToken && refreshToken) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const { data } = await refresh({ refreshToken });
                    await Token.setToken(ACCESS_TOKEN, data.accessToken);
                    onRefreshed(data.accessToken);
                } catch {
                    await Token.removeToken();
                    router.replace("/auth/login");
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                refreshQueue.push((token: string) => {
                    if (originalRequest?.headers) {
                        originalRequest.headers[REQUEST_TOKEN] = `Bearer ${token}`;
                        originalRequest._retry = true;
                        resolve(axios(originalRequest));
                    }
                });
            });
        }
    }

    await errorHandler(error);
    return Promise.reject(error);
};