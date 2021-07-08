import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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
import { registrarUsuario, login } from '../../services/usuario';
import { getCategoria } from '../../services/categoria';
import { registrarEstabelecimento, editarEstabelecimento } from '../../services/estabelecimento';
import { useFocusEffect } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createValidationSchema, editValidationSchema } from './validationSchema';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text';
import { Dialog, Paragraph, Portal, Button, Modal } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

async function saveUser(user) {
    await AsyncStorage.setItem('@App:token', JSON.stringify(user))
}

const Cadastro = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [imagem, setImagem] = useState(estabelecimento?.imagem || null);
    const [arrayCategorias, setArrayCategorias] = useState([]);
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState(null);
    const [navParams, setNavParams] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const estabelecimento = route.params?.estabelecimento || false;
    const { id_user, base64 } = route.params || false;
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

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
    }, [register]);

    const escolherImagem = () => {
        let options = {
            title: 'Selecione uma imagem',
            mediaType: 'photo',
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response && response.assets) {
                setImagem(response.assets[0].base64);
            }
        });
    };

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

    const navigationToNextScreen = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{
                    name: 'Produtos',
                    params: {
                        user: navParams.user,
                        estabelecimento: navParams.estabelecimento
                    },
                }],
            })
        );
        hideDialog();
    }

    const handleSalvar = params => {
        if (estabelecimento) {
            handleEditar(params);
        } else {
            handleCadastrar(params);
        }
    };

    const handleEditar = async params => {
        setLoading(true);
        await editarEstabelecimento(estabelecimento.id, {
            razao_social: params.razao_social,
            nome_fantasia: params.nome_fantasia,
            cnpj: params.cnpj,
            endereco: params.endereco,
            telefone: params.telefone,
            id_categoria: params.categoria,
            imagem,
        });

        setNavParams({
            ...navParams,
            user: id_user,
            estabelecimento: estabelecimento.id
        });

        setLoading(false)

        showDialog();
    };

    const handleCadastrar = async params => {
        setLoading(true);
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
                id_estabelecimento = data.retorno;
                const logUsuario = await login({ email: params.email, password: params.password });

                await saveUser(logUsuario.data);
                setNavParams({
                    ...navParams,
                    user: user_id,
                    estabelecimento: id_estabelecimento
                });
                setLoading(false);

                showDialog();
            } else if (dataUser.status === 409) {
                Alert.alert(
                    'Aviso',
                    'Não foi possível efetuar o cadastro. E-mail já cadastrado. Por favor, verifique os dados e tente novamente.',
                    [{ text: 'OK' }],
                    { cancelable: false },
                );
                setLoading(false)
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
                        placeholder={"Informe a razão social"}
                        onChangeText={text => setValue('razao_social', text)}
                        defaultValue={getValues().razao_social || ''}
                    />
                    <TextField
                        label={"Nome Fantasia"}
                        error={errors?.nome_fantasia}
                        placeholder={"Informe o nome fantasia"}
                        onChangeText={text => setValue('nome_fantasia', text)}
                        defaultValue={getValues().nome_fantasia || ''}
                    />

                    <TextMaskField
                        type={'cnpj'}
                        label={"Cnpj"}
                        error={errors?.cnpj}
                        placeholder={"Informe o CNPJ"}
                        includeRawValueInChangeText={true}
                        onChangeText={(mask, text) => setValue('cnpj', text)}
                        value={getValues().cnpj || ''}
                    />

                    <TextField
                        label={"Endereço"}
                        error={errors?.endereco}
                        placeholder={"Informe o endereço"}
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
                        placeholder={"Informe o telefone"}
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
                        value={estabelecimento ? getValues().id_categoria : undefined}
                    />

                    {estabelecimento ?
                        null
                        : <>
                            <TextField
                                label={"E-mail"}
                                error={errors?.email}
                                placeholder={"Informe o e-mail"}
                                onChangeText={text => setValue('email', text)}
                            />
                            <TextField
                                label={"Senha"}
                                error={errors?.password}
                                placeholder={"Informe a senha"}
                                onChangeText={password => { setValue('password', password); setPassword(password) }}
                                value={password}
                                innerRef={ref => ref && ref.setNativeProps({
                                    style: {
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 15,
                                    }
                                })}
                                secureTextEntry={true}
                            />
                        </>
                    }

                    <View style={styles.container}>
                        <Text style={styles.label}>Imagem</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <View style={styles.imagem}>
                                {imagem ?
                                    <Image
                                        source={{ uri: `data:image/png;base64,${imagem}` }}
                                        style={{
                                            height: "100%", width: "100%", borderRadius: 8,
                                        }}
                                    />
                                    :
                                    <Icon
                                        style={styles.icon}
                                        name="camera"
                                        size={60}
                                        color='#555'
                                    />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity disabled={loading} style={styles.button} onPress={handleSubmit(handleSalvar)}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.registrar}>
                                {estabelecimento ? 'Editar' : 'Cadastrar'}
                            </Text>
                        )}
                    </TouchableOpacity>

                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Aviso.</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>Estabelecimento {estabelecimento ? 'editado' : 'cadastrado'} com sucesso!</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button color={'rgba(15,136,147,1)'} onPress={navigationToNextScreen}>Ok</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                    <Portal>
                        <Modal
                            visible={modalVisible}
                            onDismiss={() => setModalVisible(!modalVisible)} style={styles.modalContainer} contentContainerStyle={styles.modalContent}>
                            <View style={styles.modalOpcao}>
                                <TouchableOpacity onPress={() => {
                                    escolherImagem();
                                    setModalVisible(!modalVisible);
                                }}>
                                    <Icon
                                        style={styles.icon}
                                        name="photo"
                                        size={60}
                                        color='#555'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Camera', {
                                        route: 'Cadastro'
                                    });
                                    setModalVisible(!modalVisible);
                                }}>
                                    <Icon
                                        style={styles.icon}
                                        name="camera"
                                        size={60}
                                        color='#555'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalAcao}>
                                <Button
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={{ color: 'rgba(15,136,147,1)' }}>Fechar</Text>
                                </Button>
                            </View>
                        </Modal>
                    </Portal>

                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
};

const TextField = ({ error, label, innerRef, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label} >{label}</Text>
        <TextInput ref={innerRef}
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
        paddingTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
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
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: 'Poppins-Regular',
    },
    imagem: {
        height: 150,
        fontSize: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
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
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        backgroundColor: 'rgba(15,136,147,1)',
        alignItems: 'center',
    },
    registrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: '#eee',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 100,
        borderRadius: 10
    },
    modalContainer: {
        flex: 1,
        height: '50%',
        alignItems: 'center',
        marginTop: '50%',
    },
    modalOpcao: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    modalAcao: {
        marginVertical: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        color: 'black',
    }
});
