import axios from "axios";
import {Login, NewAccessTokenResponse} from "src/types/login/login.type";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const loginApi = async (login: Login) => {
    const {data} = await axios.post(`${SERVER_URL}/login`, login);
    return data;
}

export const refresh = async (refreshToken: {refreshToken: string | null}): Promise<NewAccessTokenResponse> => {
    const {data} = await axios.post(`${SERVER_URL}/refresh`, refreshToken);
    return data;
}