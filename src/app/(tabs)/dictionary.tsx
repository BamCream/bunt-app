import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    RefreshControl, // ✅ 추가
} from "react-native";
import Lock from "../../assets/images/lock.png";
import Unlock from "../../assets/images/unlock.png";
import { useEffect, useState, useCallback } from "react";
import Header from "src/components/common/header";
import CodeInputModal from "src/components/common/modal/modal";
import { DicProps } from "src/types/DicType";
import BuntAxios from "src/libs/axios";

const DictionaryScreen = () => {
    const [items, setItems] = useState<DicProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDict = async () => {
        try {
            const res = await BuntAxios("/dict");
            setItems(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchDict();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchDict();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.mainWrapper}
                refreshControl={
                    // ✅ 당겨서 새로고침 추가
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Header title="도감" />
                <View style={styles.section}>
                    <View style={styles.filterRow}>
                        <View style={styles.categoryButtons}></View>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        columnWrapperStyle={styles.gridRow}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri: item.productImage }}
                                        style={styles.cardImage}
                                    />
                                    {item.isUnlocked === "LOCKED" && (
                                        <View style={styles.overlay} />
                                    )}
                                </View>
                                <Text style={styles.cardTitle}>
                                    {item.productName}
                                </Text>

                                <View style={{ height: 12 }} />

                                {item.isUnlocked === "LOCKED" && (
                                    <View style={styles.lockedWrapper}>
                                        <Image
                                            source={Lock}
                                            style={styles.icon}
                                        />
                                        <Text style={styles.statusText}>
                                            아직 획득하지 못했습니다
                                        </Text>
                                    </View>
                                )}
                                {item.isUnlocked === "UNLOCKED" && (
                                    <View style={styles.lockedWrapper}>
                                        <Image
                                            source={Unlock}
                                            style={styles.icon}
                                        />
                                        <Text style={styles.statusText}>
                                            획득하였습니다
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
            <CodeInputModal />
        </SafeAreaView>
    );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    mainWrapper: {
        width: "100%",
        paddingHorizontal: 30,
    },
    section: {
        marginBottom: 24,
        gap: 16,
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
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    dropdownBox: {
        position: "absolute",
        top: "100%",
        left: 0,
        width: 150,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginTop: 4,
        zIndex: 1000,
        maxHeight: 500,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#000",
    },
    icon: {
        width: 10,
        height: 13,
        alignSelf: "center",
        marginBottom: 4,
    },
    statusText: {
        fontSize: 8,
        textAlign: "center",
        color: "#555",
    },

    gridRow: {
        justifyContent: "space-between",
        marginTop: 12,
    },
    lockedWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
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
    imageWrapper: {
        position: "relative",
        width: "100%",
        aspectRatio: 1,
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    cardTitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
        color: "#000",
    },
});
