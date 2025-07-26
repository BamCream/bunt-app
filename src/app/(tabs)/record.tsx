import { SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import Header from "src/components/common/header";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const RecordScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.mainWrapper} contentContainerStyle={styles.content}>
                <Header title="기록" />

                <View style={styles.statsBox}>
                    <TextRow label="경기" value="7" />
                    <TextRow label="승" value="4" />
                    <TextRow label="무" value="1" />
                    <TextRow label="패" value="2" />
                    <TextRow label="승률" value="57%" color="#FF4D4F" />
                </View>

                <View style={styles.recordList}>
                    {DUMMY_DATA.map((item, idx) => (
                        <View key={idx} style={styles.recordCard}>
                            <View style={styles.recordTop}>
                                <Text style={styles.matchTitle}>{item.title}</Text>
                                <Text style={[styles.resultText, item.result === "승리" ? styles.win : item.result === "패배" ? styles.lose : styles.draw]}>
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

const TextRow = ({ label, value, color = "#000" }: { label: string; value: string; color?: string }) => (
    <View style={styles.statItem}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
);

const DUMMY_DATA = [
    { title: "삼성 vs KT", date: "2025.07.25", place: "수원야구장", result: "패배" },
    { title: "SSG vs 삼성", date: "2025.07.24", place: "대구 삼성 라이온즈 파크", result: "패배" },
    { title: "SSG vs 삼성", date: "2025.07.23", place: "대구 삼성 라이온즈 파크", result: "승리" },
    { title: "SSG vs 삼성", date: "2025.07.22", place: "대구 삼성 라이온즈 파크", result: "승리" },
    { title: "키움 vs 삼성", date: "2025.07.20", place: "대구 삼성 라이온즈 파크", result: "무승부" },
    { title: "SSG vs 한화", date: "2025.07.19", place: "대전한화생명파크", result: "승리" },
    { title: "SSG vs 한화", date: "2025.07.18", place: "대전한화생명파크", result: "승리" },
];

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