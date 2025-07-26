import { SafeAreaView, ScrollView, StyleSheet, Image, View, Text, Pressable } from "react-native";
import { useState } from "react";
import ProfileIcon from "src/assets/images/profileIcon.png";
import Header from "src/components/common/header";
import Post from "src/components/profile/post";
import Stat from "src/components/profile/stat";

const Profile = () => {
    const [activeTab, setActiveTab] = useState<"post" | "stat">("post");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Header title="프로필" />
                <View style={styles.profileSection}>
                    <Image source={ProfileIcon} style={styles.profileImage} resizeMode="cover" />
                    <View style={styles.info}>
                        <Text style={styles.username}>박상민</Text>
                        <Text style={styles.tag}># 삼성라이온즈</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    {["post", "stat"].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <Pressable
                                key={tab}
                                onPress={() => setActiveTab(tab as "post" | "stat")}
                                style={[styles.tabButton, isActive ? styles.activeTab : styles.inactiveTab]}
                            >
                                <Text style={isActive ? styles.activeText : styles.inactiveText}>
                                    {tab === "post" ? "게시물" : "스탯"}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {activeTab === "post" ? <Post /> : <Stat />}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
        gap: 24,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 32,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
        backgroundColor: "#ccc",
    },
    info: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    tag: {
        marginTop: 4,
        fontSize: 14,
        color: "#888",
    },
    tabContainer: {
        flexDirection: "row",
        gap: 8,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#000",
    },
    inactiveTab: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
    },
    activeText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    inactiveText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "600",
    },
});