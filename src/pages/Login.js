import React from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    Text,
    Error,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationAction, CommonActions } from '@react-navigation/native';
import { useState } from 'react';
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
            console.log(response.data);

            const user = response.data;

            await saveUser(user)

            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Produtos'
                })
            );

            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [NavigationAction.navigate({ routeName: 'Login' })],
            // })

            setLoading(false)

            // navigation.dispatch(resetAction)
        } catch (err) {
            console.log("Erro" + err);
            setLoading(false)
            setErrorMessage('Usuário não existe')
        }
    }
    return (
        <Gradient>
            <Image
                style={styles.logo}
                source={require('../assets/img/Logo.png')}
            />

            {!!errorMessage && <Error>{errorMessage}</Error>}

            <TextInput
                style={styles.button}
                placeholder="Login"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={styles.button}
                placeholder="Senha"
                value={password}
                onChangeText={password => setPassword(password)}
            />
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
                <Text>Registre-se </Text>
            </TouchableOpacity>
        </Gradient>
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
    button: {
        padding: 10,
        borderRadius: 10,
        width: 229,
        height: 55,
        marginTop: 20,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        fontSize: 22
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
});