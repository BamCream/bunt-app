import { View, StyleSheet } from "react-native";

const Post = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 12 }).map((_, index) => (
                <View key={index} style={styles.box} />
            ))}
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 2,
        rowGap: 2,
    },
    box: {
        width: "32.66%",
        aspectRatio: 1,
        backgroundColor: "#d9d9d9",
        borderRadius: 4,
    },
});