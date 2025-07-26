import { Text, Pressable, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

function Button({ title, onPress }: ButtonProps) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});