import { useCallback } from "react";
import { Alert } from "react-native";
import BuntAxios from "src/libs/axios";

interface Tag {
    name: string;
}

interface CreatePostPayload {
    title: string;
    content: string;
    imageUrl: string;
    tags: Tag[];
}

const usePost = () => {
    const createPost = useCallback(
        async (payload: CreatePostPayload) => {
            try {
                const res = await BuntAxios.post("/posts", payload);
                return res.data;
            } catch (error: any) {
                console.error("게시글 작성 에러:", error);
                Alert.alert("오류", "게시글 작성에 실패했습니다.");
                throw error;
            }
        },
        []
    );

    return { createPost };
};

export default usePost;