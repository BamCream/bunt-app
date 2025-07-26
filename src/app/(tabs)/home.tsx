import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import Header from "src/components/common/header";
import { PostProps } from "src/components/common/post/type";
import Post from "src/components/common/post/post";
import BuntAxios from "src/libs/axios";

const HomeScreen = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);

    const post = async () => {
        try {
            const res = await BuntAxios("/posts");
            setPosts(res.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        post();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper}>
                <Header />
                {posts.map((post, index) => (
                    <Post key={index} {...post} />
                ))}
            </ScrollView>
            <View style={{ height: 40 }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    mainWrapper: {
        width: "100%",
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
