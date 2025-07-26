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
import Header from "src/components/common/header";

const { width } = Dimensions.get("window");

// 이미지 타입 정의
interface UploadedImage {
    id: number;
    uri: string;
}

const UploadScreen = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    // 이미지 선택 함수 (실제 구현시 react-native-image-picker 등 사용)
    const handleImageUpload = () => {
        // 임시로 더미 이미지 추가
        const newImage: UploadedImage = {
            id: Date.now(),
            uri: `https://picsum.photos/200/200?random=${Date.now()}`,
        };
        setUploadedImages([...uploadedImages, newImage]);
    };

    // 이미지 삭제 함수
    const handleImageRemove = (imageId: number) => {
        setUploadedImages(uploadedImages.filter((img) => img.id !== imageId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.mainWrapper}
                showsVerticalScrollIndicator={false}
            >
                <Header title="게시물 업로드" />

                {/* 제목 입력 */}
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

                {/* 설명 입력 */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>설명</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="설명을 입력해주세요"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        placeholderTextColor="#999"
                    />
                </View>

                {/* 태그 입력 */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>태그</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="태그를 입력해주세요"
                        value={tags}
                        onChangeText={setTags}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* 업로드 영역 */}
                <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={handleImageUpload}
                    activeOpacity={0.7}
                >
                    <View style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>업로드</Text>
                    </View>
                </TouchableOpacity>

                {/* 업로드된 이미지들 */}
                {uploadedImages.length > 0 && (
                    <View style={styles.imageSection}>
                        <View style={styles.imageGrid}>
                            {uploadedImages.map((image, index) => (
                                <TouchableOpacity
                                    key={image.id}
                                    style={styles.imageContainer}
                                    onLongPress={() => {
                                        Alert.alert(
                                            "이미지 삭제",
                                            "이 이미지를 삭제하시겠습니까?",
                                            [
                                                {
                                                    text: "취소",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "삭제",
                                                    onPress: () =>
                                                        handleImageRemove(
                                                            image.id
                                                        ),
                                                    style: "destructive",
                                                },
                                            ]
                                        );
                                    }}
                                >
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={styles.uploadedImage}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* 하단 여백 */}
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
        width: (width - 80) / 3, // 3개씩 배치, 여백 고려
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
