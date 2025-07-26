import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import Header from "src/components/common/header";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper}>
                <Header />
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
