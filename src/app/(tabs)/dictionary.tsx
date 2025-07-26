import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    FlatList,
} from "react-native";
import { useState } from "react";
import Header from "src/components/common/header";
import CodeInputModal from "src/components/common/modal/modal";
import { TEAMS } from "src/constants/teams";

const CATEGORIES = ["모자", "유니폼", "기타"];

const DUMMY_ITEMS = Array.from({ length: 6 }, (_, i) => ({
    id: i.toString(),
    title: "Men's Los Angeles",
    image: require("src/assets/images/profileIcon.png"),
}));

const DictionaryScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("모자");
    const [selectedTeam, setSelectedTeam] = useState("삼성 라이온즈");
    const [teamDropdownVisible, setTeamDropdownVisible] = useState(false);

    const handleSubmitCode = (code: string) => {
        console.log("입력한 코드:", code);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper}>
                <Header title="도감" />
                <View style={styles.section}>
                    <View style={styles.filterRow}>
                        <View style={styles.categoryButtons}>
                            {CATEGORIES.map((cat) => {
                                const active = cat === selectedCategory;
                                return (
                                    <Pressable
                                        key={cat}
                                        onPress={() => setSelectedCategory(cat)}
                                        style={[
                                            styles.filterButton,
                                            active
                                                ? styles.activeFilter
                                                : styles.inactiveFilter,
                                        ]}
                                    >
                                        <Text
                                            style={
                                                active
                                                    ? styles.activeFilterText
                                                    : styles.inactiveFilterText
                                            }
                                        >
                                            {cat}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        <View style={{ position: "relative" }}>
                            <Pressable
                                onPress={() =>
                                    setTeamDropdownVisible(!teamDropdownVisible)
                                }
                            >
                                <Text style={styles.dropdown}>
                                    {selectedTeam} ⌄
                                </Text>
                            </Pressable>

                            {teamDropdownVisible && (
                                <View style={styles.dropdownBox}>
                                    {TEAMS.map((team) => (
                                        <Pressable
                                            key={team}
                                            onPress={() => {
                                                setSelectedTeam(team);
                                                setTeamDropdownVisible(false);
                                            }}
                                            style={styles.dropdownItem}
                                        >
                                            <Text
                                                style={styles.dropdownItemText}
                                            >
                                                {team}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    <FlatList
                        data={DUMMY_ITEMS}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        columnWrapperStyle={styles.gridRow}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image
                                    source={item.image}
                                    style={styles.cardImage}
                                />
                                <Text style={styles.cardTitle}>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>

            <CodeInputModal onSubmit={handleSubmitCode} />
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
});
