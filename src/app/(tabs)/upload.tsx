import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "src/components/common/header";
import usePost from "src/hooks/post/usePost";
import { uploadApi } from "src/apis/upload/upload.api";

const { width } = Dimensions.get("window");

interface UploadedImage {
    id: number;
    uri: string;
}

const UploadScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const { createPost } = usePost();

    const handleImageUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            console.log("선택한 이미지 URI:", image.uri);

            try {
                const imageUrl = await uploadApi(image.uri);
                console.log("서버에서 반환된 이미지 URL:", imageUrl);

                setUploadedImages([{ id: Date.now(), uri: imageUrl }]);
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
                Alert.alert("이미지 업로드 실패", "이미지 업로드 중 문제가 발생했습니다.");
            }
        } else {
            console.log("이미지 선택이 취소되었거나 유효하지 않음");
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || uploadedImages.length === 0) {
            Alert.alert("입력 오류", "제목, 설명, 이미지를 모두 입력해주세요.");
            return;
        }

        try {
            const tagList = tags
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean)
                .map(name => ({ name }));

            console.log("게시글 데이터:", {
                title,
                content: description,
                imageUrl: uploadedImages[0].uri,
                tags: tagList,
            });

            await createPost({
                title,
                content: description,
                imageUrl: uploadedImages[0].uri,
                tags: tagList,
            });

            Alert.alert("성공", "게시글이 등록되었습니다.");
            setTitle("");
            setDescription("");
            setTags("");
            setUploadedImages([]);
        } catch (err) {
            console.error("게시글 등록 실패:", err);
        }
    };

    const handleImageRemove = (imageId: number) => {
        setUploadedImages(uploadedImages.filter((img) => img.id !== imageId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper} showsVerticalScrollIndicator={false}>
                <Header title="게시물 업로드" />

                <View style={styles.inputSection}>
                    <Text style={styles.label}>제목</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.label}>설명</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="설명을 입력해주세요"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.label}>태그</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="예: 여행,맛집,풍경"
                        value={tags}
                        onChangeText={setTags}
                        placeholderTextColor="#999"
                    />
                </View>

                <TouchableOpacity style={styles.uploadArea} onPress={handleImageUpload}>
                    <View style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>이미지 선택</Text>
                    </View>
                </TouchableOpacity>

                {uploadedImages.length > 0 && (
                    <View style={styles.imageSection}>
                        <View style={styles.imageGrid}>
                            {uploadedImages.map((image) => (
                                <TouchableOpacity
                                    key={image.id}
                                    style={styles.imageContainer}
                                    onLongPress={() => {
                                        Alert.alert("이미지 삭제", "이 이미지를 삭제하시겠습니까?", [
                                            { text: "취소", style: "cancel" },
                                            {
                                                text: "삭제",
                                                onPress: () => handleImageRemove(image.id),
                                                style: "destructive",
                                            },
                                        ]);
                                    }}
                                >
                                    <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
                    <Text style={styles.uploadButtonText}>게시물 등록</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
    mainWrapper: {
        width: "100%",
        paddingHorizontal: 30,
    },
    inputSection: {
        marginTop: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 12,
        paddingHorizontal: 0,
        fontSize: 16,
        color: "#333",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        maxHeight: 150,
    },
    uploadArea: {
        marginTop: 40,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        borderWidth: 2,
        borderColor: "#f0f0f0",
        borderRadius: 12,
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
    },
    uploadButton: {
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: "#007AFF",
        borderRadius: 8,
    },
    uploadButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    imageSection: {
        marginTop: 20,
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    imageContainer: {
        width: (width - 80) / 3,
        height: (width - 80) / 3,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#eee",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    bottomSpacing: {
        height: 50,
    },
});

export default UploadScreen;