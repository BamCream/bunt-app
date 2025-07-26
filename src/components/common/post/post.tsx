import { Image, StyleSheet, Text, View } from "react-native";
import { PostProps } from "./type";

const Post = ({
    profileImg,
    profileName,
    post,
    description,
    title,
    tags,
    date,
}: PostProps) => {
    <View style={styles.container}>
        <View style={styles.profileWrap}>
            <Image style={styles.profile} source={{ uri: profileImg }} />
            <Text style={styles.name}>{profileName}</Text>
            <Image style={styles.post} source={{ uri: post }} />
            <View style={styles.infoWrap}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.tagWrap}>
                    <Text style={styles.tags}>{description}</Text>
                    {tags.map((_, item) => (
                        <Text># {tags[item]} </Text>
                    ))}
                    <View style={{ height: 8 }} />
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </View>
    </View>;
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
        fontSize: 20,
        fontWeight: 600,
        color: "#222222",
    },
    tagWrap: {
        display: "flex",
        flexDirection: "row",
    },
    description: {
        fontSize: 12,
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
