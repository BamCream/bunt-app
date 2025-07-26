import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Header from "src/components/common/header";
import CodeInputModal from "src/components/common/modal/modal";

const DictionaryScreen = () => {
    const handleSubmitCode = (code: string) => {
        console.log("입력한 코드:", code);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper}>
                <Header title="도감" />
            </ScrollView>

            <CodeInputModal onSubmit={handleSubmitCode} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    mainWrapper: {
        width: "100%",
        paddingHorizontal: 30,
    },
});

export default DictionaryScreen;
