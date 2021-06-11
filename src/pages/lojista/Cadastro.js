import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../../utils/gradientButton';
import { register } from '../../services/usuario';
import { registrarEstabelecimento, editarEstabelecimento } from '../../services/estabelecimento';
import { editarProduto } from '../../services/produto';
import { useFocusEffect } from '@react-navigation/core';

async function saveUser(user) {
    await AsyncStorage.setItem('@App:token', JSON.stringify(user))
}

export default function Cadastro({ route, navigation }) {
    const estabelecimento = route.params?.estabelecimento || false;
    const user = route.params?.user || false;
    const { user_id, base64 } = route.params || false;


    //States do Usuário
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setpassword] = useState("");

    //States do estabelecimento.
    const [razao_social, setRazao_social] = useState(estabelecimento ? estabelecimento.razao_social : "");
    const [nome_fantasia, setNome_fantasia] = useState(estabelecimento ? estabelecimento.nome_fantasia : "");
    const [cnpj, setCnpj] = useState(estabelecimento ? estabelecimento.cnpj : "");
    const [endereco, setEndereco] = useState(estabelecimento ? estabelecimento.endereco : "");
    const [telefone, setTelefone] = useState(estabelecimento ? estabelecimento.telefone : "");
    const [imagem, setImagem] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const teste = base64 ? base64 : estabelecimento.imagem || undefined;
            setImagem(teste);
        }, [base64])
    );


    const handleRegistrar = async () => {
        let id_estabelecimento = null;
        let user_id = null;
        if (estabelecimento) {
            await editarEstabelecimento(estabelecimento.id, {
                razao_social,
                nome_fantasia,
                cnpj,
                endereco,
                imagem,
                telefone
            });
            await editarProduto(user.id, {
                email,
                password
            })
        } else {
            const resUsuario = await register({ email, password });
            await saveUser(resUsuario.data);
            if (resUsuario.status === 201 || 200) {
                user_id = resUsuario.data.user.id;
                const { data } = await registrarEstabelecimento({
                    razao_social,
                    nome_fantasia,
                    cnpj,
                    endereco,
                    telefone,
                    imagem,
                    user_id
                });
                console.log(data);
                id_estabelecimento = data.retorno.id;
            }
        };
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            <View style={styles.container}>

                <TextInput
                    style={styles.button}
                    placeholder="Razão Social"
                    value={razao_social}
                    onChangeText={razao_social => setRazao_social(razao_social)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="Nome Fantasia"
                    value={nome_fantasia}
                    onChangeText={nome_fantasia => setNome_fantasia(nome_fantasia)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="Cnpj"
                    value={cnpj}
                    onChangeText={cnpj => setCnpj(cnpj)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={endereco => setEndereco(endereco)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={telefone => setTelefone(telefone)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    style={styles.button}
                    placeholder="password"
                    value={password}
                    onChangeText={password => setpassword(password)}
                    secureTextEntry={true}
                />

                <View style={[styles.anexo, styles.button]}>
                    {imagem ?
                        <Image
                            source={{ uri: `data:image/png;base64,${imagem}` }}
                            style={{ height: "100%", width: "100%" }}
                            onPress={() => navigation.navigate('Camera', {
                                route: 'Cadastro'
                            })}
                        />
                        : <Icon
                            style={styles.icon} name="camera" size={80} color='#555'
                            onPress={() => navigation.navigate('Camera', {
                                route: 'Cadastro'
                            })} />
                    }
                </View>


                <GradientButton buttonStyle={styles.buttonEntrar}>
                    <TouchableOpacity onPress={handleRegistrar}>
                        {/* <TouchableOpacity onPress = {() => navigation.navigate('Produtos')}> */}
                        <Text style={styles.registrar}>
                            Registrar
                    </Text>
                    </TouchableOpacity>
                </GradientButton>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    button: {
        padding: 5,
        borderRadius: 10,
        width: 350,
        height: 40,
        marginTop: 20,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        fontSize: 15
    },
    registrar: {
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
    anexo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center'
    },

});
