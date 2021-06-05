import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import GradientButton from '../../utils/gradientButton';
import { register } from '../../services/usuario';
import { registrarEstabelecimento, editarEstabelecimento } from '../../services/estabelecimento';
import { editarProduto } from '../../services/produto';

export default function Cadastro({ route, navigation }) {
    const estabelecimento = route.params?.estabelecimento || false;
    const user = route.params?.user || false;

    //States do Usuário
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setpassword] = useState("");

    //States do estabelecimento.
    const [razao_social, setRazao_social] = useState(estabelecimento ? estabelecimento.razao_social : "");
    const [nome_fantasia, setNome_fantasia] = useState(estabelecimento ? estabelecimento.nome_fantasia : "");
    const [cnpj, setCnpj] = useState(estabelecimento ? estabelecimento.cnpj : "");
    const [endereco, setEndereco] = useState(estabelecimento ? estabelecimento.endereco : "");
    const [telefone, setTelefone] = useState(estabelecimento ? estabelecimento.telefone : "");

    const handleRegistrar = async () => {
        if (estabelecimento) {
            await editarEstabelecimento(estabelecimento.id, {
                razao_social,
                nome_fantasia,
                cnpj,
                endereco,
                telefone
            });
            await editarProduto(user.id, {
                email,
                password
            })
        } else {
            const resUsuario = await register({ email, password });
            if (resUsuario.status === 201) {
                const id_user = resUsuario.data.user.id;
                const { data } = await registrarEstabelecimento({
                    razao_social,
                    nome_fantasia,
                    cnpj,
                    endereco,
                    telefone,
                    id_user
                });
                console.log(data);
            }
        };
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Produtos',
                params: {
                    user: id_user
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
        width: 288,
        height: 35,
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

});
