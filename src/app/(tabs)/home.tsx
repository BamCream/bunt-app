import React, { useEffect, useState, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
} from "react-native";
import Header from "src/components/common/header";
import { PostProps } from "src/components/common/post/type";
import Post from "src/components/common/post/post";
import BuntAxios from "src/libs/axios";

const HomeScreen = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await BuntAxios("/posts");
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.mainWrapper}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
