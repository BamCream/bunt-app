import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import Logo from "../../assets/images/logo.png";
import { useIsModalOpenStore } from "src/store/isModalOpenStore";

interface HeaderProps {
    title?: string;
}

const Header = ({ title }: HeaderProps) => {
    const { setModalOpen } = useIsModalOpenStore();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {title ? (
                    <>
                        <Text style={styles.title}>{title}</Text>
                        {title === "도감" ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalOpen(true)}
                            >
                                <Text style={styles.buttonText}>도감 등록</Text>
                            </TouchableOpacity>
                        ) : title === "기록" ? (
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>기록 등록</Text>
                            </TouchableOpacity>
                        ) : null}
                    </>
                ) : (
                    <Image
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
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#222222",
    },
    wrapper: {
        width: "100%",
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    button: {
        backgroundColor: "#222",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 12,
        color: "#ffffff",
        fontWeight: "600",
    },
});

export default Header;
