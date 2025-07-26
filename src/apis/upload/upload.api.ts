import * as FileSystem from "expo-file-system";
import BuntAxios from "src/libs/axios";

export const uploadApi = async (fileUri: string): Promise<string> => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) throw new Error("파일이 존재하지 않습니다.");

    const fileName = fileUri.split("/").pop() || `upload_${Date.now()}.jpg`;
    const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

    const formData = new FormData();
    formData.append("file", {
        uri: fileUri,
        type: fileType,
        name: fileName,
    } as unknown as Blob);

    const response = await BuntAxios.post("/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};