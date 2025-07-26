import {
    SafeAreaView,
    Image,
    StyleSheet,
    View,
    ScrollView,
} from "react-native";
import Logo from "../../assets/images/logo.png";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainWrapper}>
                <Image
                    source={Logo}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
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
        paddingHorizontal: 30,
    },
});

export default HomeScreen;
