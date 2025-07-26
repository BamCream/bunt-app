import { Image, StyleSheet, Text, View } from "react-native";
import { PostProps } from "./type";

const Post = ({ ...post }: PostProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileWrap}>
                <View
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#222222",
                        borderRadius: 999,
                    }}
                />
                <Text style={styles.name}>박상민</Text>
            </View>
            <Image style={styles.post} source={{ uri: post.imageUrl }} />
            <View style={styles.infoWrap}>
                <Text style={styles.title}>{post.title}</Text>
                <View style={styles.tagWrap}>
                    <Text style={styles.description}>{post.content} </Text>
                    {post.tags.map((item, index) => (
                        <Text key={index} style={styles.tags}>
                            # {item}{" "}
                        </Text>
                    ))}
                </View>
                <View style={{ height: 8 }} />
                <Text style={styles.date}>{post.createdAt.slice(0, 10)}</Text>
            </View>
            <View style={{ height: 20 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 8,
        display: "flex",
        flexDirection: "column",
    },
    profileWrap: {
        gap: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    profile: {
        width: 30,
        height: 30,
        borderRadius: 999,
    },
    name: {
        fontSize: 16,
        fontWeight: 600,
        color: "#222222",
    },
    post: {
        width: "100%",
        height: 288,
        borderRadius: 8,
    },
    infoWrap: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        color: "#222222",
    },
    tagWrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    description: {
        fontSize: 16,
        fontWeight: 400,
        color: "#222222",
    },
    tags: {
        fontSize: 10,
        color: "#999999",
        fontWeight: 300,
    },
    date: {
        fontSize: 10,
        color: "#222222",
    },
});

export default Post;
