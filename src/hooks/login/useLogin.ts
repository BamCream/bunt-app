import {useState, useCallback} from "react";
import {loginApi} from "src/apis/login/login.api";
import Token from "src/libs/token";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "src/constants/token/token";
import {showToast} from "src/libs/toast";
import {router} from "expo-router";
import type {Login} from "src/types/login/login.type";

const useLogin = () => {
    const [loginData, setLoginData] = useState<Login>({
        username: "",
        password: "",
    });

    const handleLoginData = useCallback((key: keyof Login, value: string) => {
        setLoginData(prev => ({...prev, [key]: value}));
    }, []);

    const submitLoginData = useCallback(async () => {
        const {username, password} = loginData;

        if (!username.trim()) return showToast("info", "아이디를 입력해주세요.");

        if (!password.trim()) return showToast("info", "비밀번호를 입력해주세요.");

        try {
            const response = await loginApi(loginData); // <- async 호출
            const {accessToken, refreshToken} = response.data;
            const {status} = response;

            if (status === 200 || status === 201) {
                await Token.setToken(ACCESS_TOKEN, accessToken);
                await Token.setToken(REFRESH_TOKEN, refreshToken);

                showToast("success", "로그인 성공");
                // router.replace("/(tabs)/main");
            } else {
                showToast("error", `로그인 실패 (status: ${status})`);
            }
        } catch (e) {
            showToast("error", "아이디 또는 비밀번호를 다시 확인해주세요.");
        }
    }, [loginData]);

    return {loginData, handleLoginData, submitLoginData};
};

export default useLogin;