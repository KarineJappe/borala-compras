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
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const fieldValidation = yup.object().shape({
    email: yup
        .string()
        .required('O email não pode ser vazio.')
        .email('Digite um email válido')
        .max(30, 'O email deve conter no máximo 30 díǵitos.'),
    password: yup
        .string()
        .required('A senha não pode ser vazia.')
        .min(4, 'A senha deve conter pelo menos 4 dígitos'),
});

export default function Login({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm({
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
                CommonActions.reset({
                    index: 1,
                    routes: [{
                        name: 'Produtos',
                        params: {
                            user: user.user.id,
                            estabelecimento: user.user.estabelecimento.id
                        },
                    }],
                })
            );
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setErrorMessage('E-mail e/ou senha incorretos.')
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
                    label={"E-mail"}
                    error={errors?.email}
                    placeholder="Informe o e-mail."
                    onChangeText={email => setValue('email', email)}
                />

                <TextField
                    label={"Senha"}
                    error={errors?.password}
                    placeholder="Informe a senha."
                    onChangeText={password => { setValue('password', password); setPassword(password) }}
                    value={password}
                    innerRef={ref => ref && ref.setNativeProps({ style: { fontFamily: 'Poppins-Regular' } })}
                    secureTextEntry={true}
                />

                <TouchableOpacity disabled={loading} style={styles.button} onPress={handleSubmit(signIn)}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />

                    ) : (
                        <Text style={styles.entrar}>
                            Entrar
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.registro}>Registre-se</Text>
                </TouchableOpacity>
            </Gradient>
        </KeyboardAvoidingView>
    );
}

const TextField = ({ error, label, innerRef, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput ref={innerRef}
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
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: 'Poppins-Regular',
    },
    entrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22,
        color: "#eee",
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        marginTop: 20,
        backgroundColor: 'rgba(15,136,147,1)',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
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