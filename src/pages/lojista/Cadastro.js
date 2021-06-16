import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../../utils/gradientButton';
import { registrarUsuario, login, editarUsuario } from '../../services/usuario';
import { registrarEstabelecimento, editarEstabelecimento } from '../../services/estabelecimento';
import { useFocusEffect } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createValidationSchema, editValidationSchema } from './validationSchema'

async function saveUser(user) {
    await AsyncStorage.setItem('@App:token', JSON.stringify(user))
}

const Cadastro = ({ route, navigation }) => {
    const estabelecimento = route.params?.estabelecimento || false;
    const user = route.params?.user || false;
    const { id_user, base64 } = route.params || false;
    const [imagem, setImagem] = useState(estabelecimento?.imagem || '');

    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: estabelecimento || {},
        resolver: yupResolver(estabelecimento ? editValidationSchema : createValidationSchema),
    });

    useFocusEffect(
        React.useCallback(() => {
            const teste = base64 ? base64 : estabelecimento.imagem || undefined;
            setImagem(teste);
        }, [base64])
    );

    useEffect(() => {
        register('razao_social')
        register('nome_fantasia')
        register('cnpj')
        register('endereco')
        register('telefone')
        register('email')
        register('password')
    }, [register])

    const handleRegistrar = async params => {
        let id_estabelecimento = null;
        let user_id = id_user;

        if (estabelecimento) {
            const response = await editarEstabelecimento(estabelecimento.id, {
                razao_social: params.razao_social,
                nome_fantasia: params.nome_fantasia,
                cnpj: params.cnpj,
                endereco: params.endereco,
                telefone: params.telefone,
                imagem
            });

            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Produtos',
                    params: {
                        user: id_user,
                        estabelecimento: estabelecimento.id
                    },
                })
            );
            return ''
        }

        const regUsuario = await registrarUsuario({ email: params.email, password: params.password });
        if (regUsuario.status === 201 || 200) {
            user_id = regUsuario.data.user.id;
            const { data } = await registrarEstabelecimento({
                razao_social: params.razao_social,
                nome_fantasia: params.nome_fantasia,
                cnpj: params.cnpj,
                endereco: params.endereco,
                telefone: params.telefone,
                imagem,
                user_id
            });

            id_estabelecimento = data.retorno.id;

            const logUsuario = await login({ email: params.email, password: params.password });
            await saveUser(logUsuario.data);

            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Produtos',
                    params: {
                        user: user_id,
                        estabelecimento: id_estabelecimento
                    },
                })
            );

        };
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TextField
                        label={"Razão Social"}
                        error={errors?.razao_social}
                        placeholder={"Ex: BoraLa compras LTDA"}
                        onChangeText={text => setValue('razao_social', text)}
                        defaultValue={getValues().razao_social || ''}
                    />
                    <TextField
                        label={"Nome Fantasia"}
                        error={errors?.nome_fantasia}
                        placeholder={"Nome Fantasia"}
                        onChangeText={text => setValue('nome_fantasia', text)}
                        defaultValue={getValues().nome_fantasia || ''}
                    />
                    <TextField
                        label={"Cnpj"}
                        error={errors?.cnpj}
                        placeholder={"Cnpj"}
                        onChangeText={text => setValue('cnpj', text)}
                        defaultValue={getValues().cnpj || ''}
                    />
                    <TextField
                        label={"Endereço"}
                        error={errors?.endereco}
                        placeholder={"Endereço"}
                        onChangeText={text => setValue('endereco', text)}
                        defaultValue={getValues().endereco || ''}
                    />
                    <TextField
                        label={"Telefone"}
                        error={errors?.telefone}
                        placeholder={"DD XXXXX-XXXX"}
                        onChangeText={text => setValue('telefone', text)}
                        defaultValue={getValues().telefone || ''}
                    />

                    {estabelecimento ?
                        null
                        :
                        <>
                            <TextField
                                label={"Email"}
                                error={errors?.email}
                                placeholder={"email@gmail.com"}
                                onChangeText={text => setValue('email', text)}
                            />
                            <TextField
                                label={"Senha"}
                                error={errors?.password}
                                placeholder={"******"}
                                onChangeText={text => setValue('password', text)}
                                secureTextEntry
                            />
                        </>
                    }

                    <View style={styles.container}>
                        <Text style={styles.label}>Imagem</Text>
                        {imagem ?
                            <View style={[styles.anexo, styles.imagem]}>
                                <Image
                                    source={{ uri: `data:image/png;base64,${imagem}` }}
                                    style={{ height: "100%", width: "100%" }}
                                    onPress={() => navigation.navigate('Camera', {
                                        route: 'Cadastro'
                                    })}
                                />
                            </View>
                            :
                            <View style={[styles.anexo, styles.imagem]}>
                                <Icon
                                    style={styles.icon} name="camera" size={60} color='#555'
                                    onPress={() => navigation.navigate('Camera', {
                                        route: 'Cadastro'
                                    })} />
                            </View>
                        }
                    </View>

                    <GradientButton buttonStyle={styles.buttonEntrar}>
                        <TouchableOpacity onPress={handleSubmit(handleRegistrar)}>
                            <Text style={styles.registrar}>
                                Registrar
                            </Text>
                        </TouchableOpacity>
                    </GradientButton>
                </View >
            </ScrollView>
        </KeyboardAvoidingView >
    )
};

const TextField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label} >{label}</Text>
        <TextInput
            style={[styles.input, !!error && styles.borderError]}
            {...inputProps}
        />
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
)


export default Cadastro;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: 'black',
        marginBottom: 4
    },
    input: {
        height: 40,
        fontSize: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    imagem: {
        height: 150,
        fontSize: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    label: {
        fontSize: 14,
        color: 'black',
        marginBottom: 4
    },
    container: {
        width: '80%',
        borderRadius: 10,
        marginBottom: 10
    },
    anexo: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    buttonEntrar: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        marginTop: 20,
        color: 'black',
        alignItems: 'center',
    },
    registrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    },

    // button: {
    //     padding: 5,
    //     borderRadius: 10,
    //     width: 350,
    //     height: 40,
    //     marginTop: 20,
    //     backgroundColor: '#ffff',
    //     color: 'black',
    //     fontFamily: 'Poppins-Regular',
    //     textAlign: 'left',
    //     fontSize: 15
    // },
    // anexo: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // icon: {
    //     alignItems: 'center'
    // },
});
