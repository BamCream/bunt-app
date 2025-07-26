import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/constants/token/token';

class Token {
    public async getToken(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }

    public async setToken(key: string, token: string): Promise<void> {
        await AsyncStorage.setItem(key, token);
    }

    public async clearToken(): Promise<void> {
        await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);
    }
}

export default new Token();