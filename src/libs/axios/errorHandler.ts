import NetInfo from "@react-native-community/netinfo";
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";
import {Alert} from "react-native";

export const errorHandler = async (error: AxiosError): Promise<void> => {
    try {
        if (error.response) {
            // 서버 응답이 있는 경우
            const { status, data } = error.response;
            const message = (data as any)?.message || "알 수 없는 오류 발생";

            switch (status) {
                case 400:
                    Toast.show({ type: "error", text1: "요청 오류", text2: message });
                    break;
                case 401:
                    Alert.alert("인증 오류", "로그인이 필요합니다.");
                    break;
                case 403:
                    Alert.alert("권한 오류", "접근 권한이 없습니다.");
                    break;
                case 404:
                    Toast.show({ type: "error", text1: "리소스를 찾을 수 없습니다." });
                    break;
                case 500:
                    Toast.show({ type: "error", text1: "서버 오류", text2: "서버에서 문제가 발생했습니다." });
                    break;
                default:
                    Toast.show({ type: "error", text1: "오류 발생", text2: message });
            }
        } else if (error.request) {
            // 서버 응답이 없는 경우
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected) {
                Toast.show({ type: "error", text1: "네트워크 오류", text2: "인터넷 연결을 확인하세요." });
            } else {
                Toast.show({ type: "error", text1: "서버 응답 없음", text2: "서버와 연결할 수 없습니다." });
            }
        } else {
            Toast.show({ type: "error", text1: "오류 발생", text2: error.message || "알 수 없는 오류 발생" });
        }
    } catch (err) {
        console.error("errorHandler 처리 중 오류 발생:", err);
    }
};