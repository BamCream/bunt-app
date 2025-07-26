import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Header from "src/components/common/header";

const UploadScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.mainWrapper}>
                <Header title="게시물 업로드" />
            </ScrollView>
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

export default UploadScreen;
