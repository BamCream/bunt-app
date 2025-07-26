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

const UploadScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { createPost } = usePost();

    const handleImageUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            try {
                const uploaded = await uploadApi(image.uri);
                setImageUrl(uploaded);
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
                Alert.alert("이미지 업로드 실패", "업로드 중 오류가 발생했습니다.");
            }
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !imageUrl) {
            Alert.alert("입력 오류", "제목, 설명, 이미지를 모두 입력해주세요.");
            return;
        }

        const tagList = tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

        try {
            await createPost({
                title,
                content: description,
                imageUrl,
                tags: tagList,
            });

            Alert.alert("성공", "게시글이 등록되었습니다.");
            setTitle("");
            setDescription("");
            setTags("");
            setImageUrl(null);
        } catch (err) {
            console.error("게시글 등록 실패:", err);
        }

        console.log({ title, description, imageUrl, tags: tagList });
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
                        placeholder="ex) 최강 포수"
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

                {imageUrl && (
                    <TouchableOpacity
                        style={styles.imageContainer}
                        onLongPress={() =>
                            Alert.alert("이미지 삭제", "이 이미지를 삭제하시겠습니까?", [
                                { text: "취소", style: "cancel" },
                                {
                                    text: "삭제",
                                    style: "destructive",
                                    onPress: () => setImageUrl(null),
                                },
                            ])
                        }
                    >
                        <Image source={{ uri: imageUrl }} style={styles.uploadedImage} />
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
                    <Text style={styles.uploadButtonText}>게시물 등록</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mainWrapper: {
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
    imageContainer: {
        width: (width - 80) / 2,
        height: (width - 80) / 2,
        alignSelf: "center",
        marginBottom: 20,
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