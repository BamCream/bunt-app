import Toast from "react-native-root-toast";

export const showToast = (
    type: "success" | "error" | "info",
    message: string
) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        backgroundColor:
            type === "success"
                ? "#4CAF50"
                : type === "error"
                    ? "#F44336"
                    : "#2196F3",
        textColor: "white",
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
};