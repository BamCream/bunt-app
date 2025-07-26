import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Image,
} from "react-native";
import { useEffect, useState } from "react";
import BuntAxios from "src/libs/axios";
import { DicProps } from "src/types/DicType";

const DUMMY_ITEMS = Array.from({ length: 6 }, (_, i) => ({
    id: i.toString(),
    title: "Men's Los Angeles",
    description: "일반한 모자입니다.",
    image: require("src/assets/images/profileIcon.png"),
}));

const Stat = () => {
    const [items, setItems] = useState<DicProps[]>([]);
    const post = async () => {
        try {
            const res = await BuntAxios("/dict");
            setItems(res.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        post();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>올해 현장 직관 승률</Text>

            <View style={styles.statBox}>
                {["경기", "승", "무", "패", "승률"].map((label, index) => (
                    <View style={styles.statItem} key={label}>
                        <Text style={styles.statLabel}>{label}</Text>
                        <Text
                            style={[
                                styles.statValue,
                                index === 4 && styles.redText,
                            ]}
                        >
                            {index === 4 ? "100%" : "20"}
                        </Text>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>나의 도감</Text>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.gridRow}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ url: item.productImage }}
                            style={styles.cardImage}
                        />
                        <Text style={styles.cardTitle}>{item.productName}</Text>
                    </View>
                )}
                scrollEnabled={false}
            />
        </View>
    );
};

export default Stat;

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    statBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f3f3f3",
        borderRadius: 12,
        padding: 16,
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statLabel: {
        fontSize: 14,
        color: "#555",
    },
    statValue: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    redText: {
        color: "#FF0000",
    },
    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryButtons: {
        flexDirection: "row",
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    activeFilter: {
        backgroundColor: "#000",
    },
    inactiveFilter: {
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#fff",
    },
    activeFilterText: {
        color: "#fff",
        fontWeight: "600",
    },
    inactiveFilterText: {
        color: "#000",
        fontWeight: "600",
    },
    dropdown: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000",
    },
    gridRow: {
        justifyContent: "space-between",
        marginTop: 12,
    },
    card: {
        width: "30%",
        marginBottom: 20,
    },
    cardImage: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "#ccc",
        borderRadius: 8,
    },
    cardTitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
        color: "#000",
    },
    cardDesc: {
        fontSize: 11,
        color: "#777",
    },
});
