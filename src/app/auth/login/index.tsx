import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import TextField from 'src/components/ui/textfield';
import Button from 'src/components/ui/button';
import useLogin from 'src/hooks/login/useLogin';

function Login() {
    const { loginData, handleLoginData, submitLoginData } = useLogin();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>로그인</Text>

                <TextField
                    label="닉네임"
                    placeholder="닉네임을 입력하세요"
                    value={loginData.username}
                    onChangeText={(text) => handleLoginData('username', text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextField
                    label="비밀번호"
                    placeholder="비밀번호를 입력하세요"
                    value={loginData.password}
                    onChangeText={(text) => handleLoginData('password', text)}
                    secureTextEntry
                />

                <Button title="로그인" onPress={submitLoginData} />

                <Pressable onPress={() => {}}>
                    <Text style={styles.link}>회원가입</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 32,
        textAlign: 'center',
    },
    link: {
        marginTop: 16,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});