import { View, StyleSheet } from "react-native";

const Post = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 2,
    },
    box: {
        width: "100%",
        height: 30,
        backgroundColor: "#ccc",
        marginBottom: 2,
        borderRadius: 4,
    },
});