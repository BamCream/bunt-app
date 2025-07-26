import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import BuntAxios from "src/libs/axios";

const Camera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const router = useRouter();

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>카메라 사용을 위해 권한이 필요합니다</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.buttonText}>권한 허용</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
                base64: false,
                skipProcessing: false,
            });

            console.log("📸 캡처됨:", photo);

            const compressed = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 512 } }],
                {
                    compress: 0.6,
                    format: ImageManipulator.SaveFormat.JPEG,
                }
            );

            console.log("📉 압축된 URI:", compressed.uri);

            const fileName = `photo_${Date.now()}.jpg`;
            const newPath = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.copyAsync({
                from: compressed.uri,
                to: newPath,
            });

            const fileInfo = await FileSystem.getInfoAsync(newPath);

            if (fileInfo.exists) {
                const updatedPhoto = { ...photo, uri: newPath };
                await uploadPhotoToServer(updatedPhoto);
                router.back();
            } else {
                Alert.alert("오류", "파일 복사에 실패했습니다.");
            }
        } catch (error: any) {
            console.error("사진 촬영 실패:", error);
            Alert.alert("오류", `사진 촬영에 실패했습니다: ${error.message}`);
        }
    };

    const uploadPhotoToServer = async (photo: any) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(photo.uri);
            if (!fileInfo.exists) throw new Error("업로드할 파일이 존재하지 않습니다.");

            console.log("업로드할 파일 URI:", photo.uri);
            console.log("파일 크기:", fileInfo.size, "bytes");

            const formData = new FormData();
            formData.append("photo", {
                uri: photo.uri,
                type: "image/jpeg",
                name: `photo_${Date.now()}.jpg`,
            } as any);

            const response = await BuntAxios.post("/upload/photo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 30000,
            });

            console.log("✅ 업로드 성공:", response.data);
            Alert.alert("성공", "사진이 업로드되었습니다.");
        } catch (error: any) {
            console.error("❌ 업로드 실패:", error);
            if (error.response) {
                console.log("서버 응답 에러:", error.response.status, error.response.data);
                Alert.alert("서버 오류", `업로드 실패: ${error.response.status}`);
            } else if (error.request) {
                Alert.alert("네트워크 오류", "서버에 연결할 수 없습니다.");
            } else {
                Alert.alert("오류", error.message || "사진 업로드에 실패했습니다.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back">
                <View style={styles.controls}>
                    <TouchableOpacity onPress={takePicture} style={styles.shutterButton}>
                        <Text style={styles.buttonText}>촬영</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
                        <Text style={styles.buttonText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
};

export default Camera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: "flex-end",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 50,
        paddingHorizontal: 20,
    },
    shutterButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 50,
        minWidth: 80,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#FF3B30",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    permissionText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
});