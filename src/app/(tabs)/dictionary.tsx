import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const DictionaryScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.mainWrapper}></ScrollView>
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
        paddingHorizontal: 30,
    },
});

export default DictionaryScreen;
