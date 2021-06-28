import React, { useState, useEffect } from 'react';
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
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const fieldValidation = yup.object().shape({
    email: yup
        .string()
        .required('O email não pode ser vazio.'),
    password: yup
        .string()
        .required('A senha não pode ser vazia.')
        .min(6, 'A senha deve conter pelo menos 6 dígitos'),
});

export default function Login({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(fieldValidation)
    });

    async function saveUser(user) {
        await AsyncStorage.setItem('@App:token', JSON.stringify(user))
    };

    useEffect(() => {
        register('email')
        register('password')
    }, [register]);

    const signIn = async params => {
        if (params.email.length === 0) return
        setLoading(true);
        try {
            const credentials = {
                email: params.email,
                password: params.password
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

                <TextField
                    label={"Email"}
                    error={errors?.email}
                    placeholder="Digite seu email.."
                    onChangeText={email => setValue('email', email)}
                />

                <TextField
                    label={"Senha"}
                    error={errors?.password}
                    placeholder="Senha..."
                    onChangeText={password => setValue('password', password)}
                    secureTextEntry={true}
                />

                <GradientButton buttonStyle={styles.buttonEntrar}>
                    <TouchableOpacity onPress={handleSubmit(signIn)}>
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

const TextField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, !!error && styles.borderError]}
            {...inputProps}
        />
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
);

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
    borderError: {
        borderWidth: 1,
        borderColor: 'rgba(200,0,50,1)'
    },
    errorMessage: {
        fontSize: 10,
        color: 'rgba(200,0,50,1)',
        textAlign: 'center',
        marginTop: 5
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