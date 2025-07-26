import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "src/constants/token/token";

export const Token = {
    get: {
        access: () => SecureStore.getItemAsync(ACCESS_TOKEN),
        refresh: () => SecureStore.getItemAsync(REFRESH_TOKEN),
    },
    set: {
        access: (value: string) => SecureStore.setItemAsync(ACCESS_TOKEN, value),
        refresh: (value: string) => SecureStore.setItemAsync(REFRESH_TOKEN, value),
    },
    remove: {
        access: () => SecureStore.deleteItemAsync(ACCESS_TOKEN),
        refresh: () => SecureStore.deleteItemAsync(REFRESH_TOKEN),
    },
};