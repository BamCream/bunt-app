import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal as RNModal,
} from "react-native";
import { useIsModalOpenStore } from "src/store/isModalOpenStore";

interface CodeInputModalProps {
    onSubmit: (code: string) => void;
}

const CodeInputModal = ({ onSubmit }: CodeInputModalProps) => {
    const [code, setCode] = React.useState("");
    const { setModalOpen, modalOpen } = useIsModalOpenStore();

    return (
        <RNModal transparent visible={modalOpen} animationType="fade">
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.modal}>
                        <View style={styles.modalWrap}>
                            <Text style={styles.title}>코드 입력</Text>
                            <View style={{ height: 8 }} />
                            <Text style={styles.description}>
                                제품에 입력되어있는 코드를 입력해주세요.
                            </Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    value={code}
                                    onChangeText={setCode}
                                    placeholder="코드를 입력해주세요."
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setModalOpen(false)}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { color: "#222" },
                                        ]}
                                    >
                                        취소
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.submitButton]}
                                    onPress={() => {
                                        onSubmit(code);
                                        setCode("");
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { color: "#fff" },
                                        ]}
                                    >
                                        확인
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        width: "85%",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    modal: {
        padding: 20,
    },
    modalWrap: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#222",
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#7D7D7D",
    },
    inputWrap: {
        marginTop: 12,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: "#222222",
        borderBottomWidth: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    button: {
        borderRadius: 8,
        width: "48%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E0E0E0",
    },
    submitButton: {
        backgroundColor: "#222222",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default CodeInputModal;
