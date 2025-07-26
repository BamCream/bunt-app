import { View, TextInput, Text, StyleSheet } from 'react-native';
import { ComponentProps } from 'react';

interface TextFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    autoCapitalize?: ComponentProps<typeof TextInput>['autoCapitalize'];
    autoCorrect?: boolean;
}

function TextField({
                       label,
                       placeholder,
                       value,
                       onChangeText,
                       secureTextEntry = false,
                       autoCapitalize = 'none',
                       autoCorrect = false,
                   }: TextFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
            />
        </View>
    );
}

export default TextField;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: '#000',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },
});