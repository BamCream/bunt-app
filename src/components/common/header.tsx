import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Logo from "../../assets/images/logo.png";
const Header = (title?: String) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {title ? (
                    <Text style={styles.title}>title</Text>
                ) : (
                    <Logo
                        source={Logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    logo: {
        width: 50,
        height: 50,
    },
    mainWrapper: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        color: "#222222",
    },
});

export default Header;
