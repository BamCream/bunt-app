import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Pressable,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { uploadRecordImageApi, getRecordApi } from "src/apis/record/record.api";

interface MatchRecord {
    id?: number;
    title: string;
    date: string;
    place: string;
    result: "승리" | "패배" | "무승부";
}

const RecordScreen = () => {
    const [uploading, setUploading] = useState(false);
    const [records, setRecords] = useState<MatchRecord[]>([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await getRecordApi();
            const parsed = res.allRecords.map((r: any) => ({
                id: r.id,
                title: r.homeTeam || "상대팀",
                date: r.matchDate.split("T")[0],
                place: r.field,
                result: convertResult(r.result),
            }));
            setRecords(parsed);
        } catch (e) {
            Alert.alert("에러", "기록을 불러오지 못했습니다.");
        }
    };

    const convertResult = (result: string): MatchRecord["result"] => {
        switch (result) {
            case "WIN":
                return "승리";
            case "LOSE":
                return "패배";
            case "DRAW":
                return "무승부";
            default:
                return "무승부";
        }
    };

    const getRandomResult = (): MatchRecord["result"] => {
        const results = ["승리", "패배", "무승부"] as const;
        return results[Math.floor(Math.random() * results.length)];
    };

    const handleRecordRegister = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("권한 거부됨", "갤러리 접근 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: false,
        });

        if (!result.canceled && result.assets?.length) {
            const imageUri = result.assets[0].uri;
            await uploadPhotoToServer(imageUri);
        }
    };

    const uploadPhotoToServer = async (uri: string) => {
        try {
            setUploading(true);
            const fileName = uri.split("/").pop() ?? `photo_${Date.now()}.jpg`;

            const formData = new FormData();
            formData.append("image", {
                uri,
                name: fileName,
                type: "image/jpeg",
            } as any);

            const { team, date, location } = await uploadRecordImageApi(formData);

            const newRecord: MatchRecord = {
                title: team,
                date,
                place: location,
                result: getRandomResult(),
            };

            setRecords(prev => [newRecord, ...prev]);
            Alert.alert("업로드 완료", "사진이 성공적으로 업로드되었습니다.");
        } catch (error: any) {
            console.error("❌ 업로드 실패:", error);
            Alert.alert("오류", error.response?.status ? `서버 오류: ${error.response.status}` : error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.mainWrapper} contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>기록</Text>
                    <Pressable style={styles.addButton} onPress={handleRecordRegister}>
                        <Text style={styles.addButtonText}>
                            {uploading ? "업로드 중..." : "기록 등록"}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.statsBox}>
                    <TextRow label="경기" value={String(records.length)} />
                    <TextRow label="승" value={String(records.filter(r => r.result === "승리").length)} />
                    <TextRow label="무" value={String(records.filter(r => r.result === "무승부").length)} />
                    <TextRow label="패" value={String(records.filter(r => r.result === "패배").length)} />
                    <TextRow
                        label="승률"
                        value={
                            records.length > 0
                                ? `${Math.round(
                                    (records.filter(r => r.result === "승리").length / records.length) * 100
                                )}%`
                                : "0%"
                        }
                        color="#FF4D4F"
                    />
                </View>

                <View style={styles.recordList}>
                    {records.map((item, idx) => (
                        <View key={item.id ?? idx} style={styles.recordCard}>
                            <View style={styles.recordTop}>
                                <Text style={styles.matchTitle}>vs {item.title}</Text>
                                <Text
                                    style={[
                                        styles.resultText,
                                        item.result === "승리"
                                            ? styles.win
                                            : item.result === "패배"
                                                ? styles.lose
                                                : styles.draw,
                                    ]}
                                >
                                    {item.result}
                                </Text>
                            </View>
                            <View style={styles.recordBottom}>
                                <View style={styles.iconRow}>
                                    <MaterialCommunityIcons name="calendar-month" size={16} color="#888" />
                                    <Text style={styles.iconText}>{item.date}</Text>
                                </View>
                                <View style={styles.iconRow}>
                                    <Feather name="map-pin" size={16} color="#888" />
                                    <Text style={styles.iconText}>{item.place}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecordScreen;

const TextRow = ({
                     label,
                     value,
                     color = "#000",
                 }: {
    label: string;
    value: string;
    color?: string;
}) => (
    <View style={styles.statItem}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mainWrapper: {
        paddingHorizontal: 30,
    },
    content: {
        paddingBottom: 32,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    addButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: "#000",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "500",
    },
    statsBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    statItem: {
        alignItems: "center",
    },
    statLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "600",
    },
    recordList: {
        marginTop: 24,
        gap: 12,
    },
    recordCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#eee",
    },
    recordTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    matchTitle: {
        fontSize: 15,
        fontWeight: "600",
    },
    resultText: {
        fontSize: 13,
        fontWeight: "600",
    },
    win: {
        color: "#0066FF",
    },
    lose: {
        color: "#FF3B30",
    },
    draw: {
        color: "#888",
    },
    recordBottom: {
        gap: 6,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    iconText: {
        fontSize: 12,
        color: "#666",
    },
});