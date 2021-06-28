import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../../utils/gradientButton';
import { registrarUsuario, login } from '../../services/usuario';
import { getCategoria } from '../../services/categoria';
import { registrarEstabelecimento, editarEstabelecimento } from '../../services/estabelecimento';
import { useFocusEffect } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createValidationSchema, editValidationSchema } from './validationSchema';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';

async function saveUser(user) {
    await AsyncStorage.setItem('@App:token', JSON.stringify(user))
}

const Cadastro = ({ route, navigation }) => {
    const estabelecimento = route.params?.estabelecimento || false;
    const { id_user, base64 } = route.params || false;
    const [imagem, setImagem] = useState(estabelecimento?.imagem || '');
    const [arrayCategorias, setArrayCategorias] = useState([]);

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
        loadCategorias();
    }, []);

    useEffect(() => {
        register('razao_social')
        register('nome_fantasia')
        register('cnpj')
        register('endereco')
        register('telefone')
        register('categoria')
        register('email')
        register('password')
    }, [register])

    const loadCategorias = async () => {
        const { data } = await getCategoria();
        let select = [];
        if (data.data && data.data.length > 0) {
            select = data.data.map(element => {
                return {
                    value: element.id,
                    label: element.descricao,
                    key: element.id
                }
            })
        }
        setArrayCategorias(select);
    };

    const handleSalvar = params => {
        if (estabelecimento) {
            handleEditar(params);
        } else {
            handleCadastrar(params);
        }
    };

    const handleEditar = async params => {
        await editarEstabelecimento(estabelecimento.id, {
            razao_social: params.razao_social,
            nome_fantasia: params.nome_fantasia,
            cnpj: params.cnpj,
            endereco: params.endereco,
            telefone: params.telefone,
            id_categoria: params.categoria,
            imagem,
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
    };

    const handleCadastrar = async params => {
        try {
            let id_estabelecimento = null;
            let user_id = id_user;

            const dataUser = await registrarUsuario({ email: params.email, password: params.password });
            if (dataUser.status === 201 || dataUser.status === 200) {
                user_id = dataUser.data.user.id;

                const { data } = await registrarEstabelecimento({
                    razao_social: params.razao_social,
                    nome_fantasia: params.nome_fantasia,
                    cnpj: params.cnpj,
                    endereco: params.endereco,
                    telefone: params.telefone,
                    id_categoria: params.categoria,
                    imagem,
                    user_id,
                });

                idEstabelecimento = data.retorno;

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
            } else if (dataUser.status === 409) {
                Alert.alert(
                    'Aviso',
                    'Não foi possível efetuar o cadastro. E-mail já cadastrado. Por favor, verifique os dados e tente novamente.',
                    [{ text: 'OK' }],
                    { cancelable: false },
                );
            }
        } catch (e) {
        }
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

                    <TextMaskField
                        type={'cnpj'}
                        label={"Cnpj"}
                        error={errors?.cnpj}
                        placeholder={"Cnpj"}
                        includeRawValueInChangeText={true}
                        onChangeText={(mask, text) => setValue('cnpj', text)}
                        value={getValues().cnpj || ''}
                    />

                    <TextField
                        label={"Endereço"}
                        error={errors?.endereco}
                        placeholder={"Endereço"}
                        onChangeText={text => setValue('endereco', text)}
                        defaultValue={getValues().endereco || ''}
                    />

                    <TextMaskField
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(51)'
                        }}
                        label={"Telefone"}
                        placeholder={"DD XXXXX-XXXX"}
                        error={errors?.telefone}
                        includeRawValueInChangeText={true}
                        onChangeText={(mask, text) => setValue('telefone', text)}
                        value={getValues().telefone || ''}
                    />

                    <TextSelectField
                        label={"Categoria"}
                        error={errors?.categoria}
                        placeholder={{ label: 'Selecione uma categoria.' }}
                        style={pickerSelectStyles}
                        onValueChange={text => setValue('categoria', text)}
                        items={arrayCategorias}
                        value={estabelecimento ? getValues().id_categoria || '' : undefined}
                    />

                    {estabelecimento ?
                        null
                        : <>
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
                        <View style={[styles.anexo, styles.imagem]}>
                            {imagem ?
                                <Image
                                    source={{ uri: `data:image/png;base64,${imagem}` }}
                                    style={{ height: "100%", width: "100%" }}
                                    onPress={() => navigation.navigate('Camera', {
                                        route: 'Cadastro'
                                    })}
                                />
                                :
                                <Icon
                                    style={styles.icon} name="camera" size={60} color='#555'
                                    onPress={() => navigation.navigate('Camera', {
                                        route: 'Cadastro'
                                    })}
                                />
                            }
                        </View>
                    </View>

                    <GradientButton buttonStyle={styles.buttonEntrar}>
                        <TouchableOpacity onPress={handleSubmit(handleSalvar)}>
                            <Text style={styles.registrar}>
                                {estabelecimento ? 'Editar' : 'Cadastrar'}
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
);

const TextMaskField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label} >{label}</Text>
        <TextInputMask
            style={[styles.input, !!error && styles.borderError]}
            {...inputProps}
        />
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
);

const TextSelectField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label} >{label}</Text>
        <View style={[styles.input, !!error && styles.borderError]}>
            <RNPickerSelect
                {...inputProps}
            />
        </View>
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
);

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
        borderRadius: 8,
        justifyContent: 'center'
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
        fontSize: 20
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        color: 'black',
    }
});
