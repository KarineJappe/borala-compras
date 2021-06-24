import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { login } from '../services/usuario';
import Gradient from '../utils/gradientFundo';
import GradientButton from '../utils/gradientButton';
import PropTypes from 'prop-types'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    async function saveUser(user) {
        await AsyncStorage.setItem('@App:token', JSON.stringify(user))
    }

    async function signIn() {
        if (email.length === 0) return

        setLoading(true);

        try {
            const credentials = {
                email: email,
                password: password
            }
            const response = await login(credentials);
            const user = response.data;
            await saveUser(user)

            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Produtos',
                    params: {
                        user: user.user.id,
                        estabelecimento: user.user.estabelecimento.id
                    },
                })
            );
            setLoading(false)
        } catch (err) {
            console.log("Erro" + err);
            setLoading(false)
            setErrorMessage('Usuário não existe')
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Gradient>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/Logo.png')}
                />

                {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email.."
                        icon="mail"
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha..."
                        value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={true}
                    />
                </View>

                <GradientButton buttonStyle={styles.buttonEntrar}>
                    <TouchableOpacity onPress={signIn}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.entrar}>
                                Entrar
                            </Text>
                        )}
                    </TouchableOpacity>
                </GradientButton>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.registro}>Registre-se</Text>
                </TouchableOpacity>
            </Gradient>
        </KeyboardAvoidingView>
    );
}
Login.navigationOptions = () => {
    return {
        header: null,
    }
}

Login.propTypes = {
    navigation: PropTypes.shape({
        dispatch: PropTypes.func,
    }).isRequired,
}
const styles = StyleSheet.create({
    logo: {
        marginTop: 100,
        marginBottom: 50,
    },
    container: {
        width: '80%',
        borderRadius: 10,
        marginBottom: 10
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    label: {
        fontSize: 15,
        color: 'black',
        marginBottom: 4
    },
    icon: {
        padding: 10
    },
    input: {
        height: 50,
        fontSize: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 8,
        color: 'black',
        fontFamily: 'Poppins-Regular',
    },
    entrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    },
    buttonEntrar: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        marginTop: 20,
        color: 'black',
        alignItems: 'center',
    },
    error: {
        color: '#e37a7a',
        textAlign: 'center',
        marginTop: 10,
    },
    registro: {
        marginTop: 60,
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});