import BuntAxios from "src/libs/axios";

export const getRecordApi = async () => {
    const res = await BuntAxios.get("/record");
    return res.data;
};

export const uploadRecordImageApi = async (formData: FormData) => {
    const res = await BuntAxios.post("/ocr/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};