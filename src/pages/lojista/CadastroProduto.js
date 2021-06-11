import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../../utils/gradientButton';
import { registrarProduto, editarProduto } from '../../services/produto';
import { getEstabelecimentoByUserId } from '../../services/estabelecimento';
import { useFocusEffect } from '@react-navigation/core';

export default function CadastroProduto({ route, navigation }) {
    console.log(route);
    const id = route.params?.itemProduto?.id || false;
    const item_produto = route.params?.itemProduto || false;
    const { id_user, base64 } = route.params;

    //States do produto
    const [descricao, setDescricao] = useState(id ? item_produto.descricao : '');
    const [observacao, setObservacao] = useState(id ? item_produto.observacao : '');
    const [preco, setPreco] = useState(id ? item_produto.preco : '');
    const [desconto, setDesconto] = useState(id ? item_produto.desconto : '');
    const [imagem, setImagem] = useState(id ? item_produto.imagem : '');

    useFocusEffect(
        React.useCallback(() => {
            const teste = base64 ? base64 : item_produto.imagem || undefined;
            setImagem(teste);
        }, [base64])
    );

    const handleCadastrar = async () => {
        if (id) {
            setImagem(base64);
            const { data } = await editarProduto(item_produto.id, {
                descricao,
                observacao,
                preco,
                desconto,
                imagem
            });
        } else {
            const estabelecimento = await getEstabelecimentoByUserId(id_user);
            if (estabelecimento.status === 200) {
                const id_estabelecimento = estabelecimento.data.id;
                setImagem(base64);
                const data = await registrarProduto({
                    descricao,
                    observacao,
                    preco,
                    desconto,
                    id_estabelecimento,
                    imagem
                });
                console.log(data);
            } else {
                console.log(estabelecimento.status);
            }
        };

        navigation.dispatch(
            CommonActions.navigate({
                name: 'Produtos',
            })
        );
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.button}
                placeholder="Descrição"
                value={descricao}
                onChangeText={descricao => setDescricao(descricao)}
            />

            <TextInput
                style={styles.button}
                placeholder="Observações: tamanhos, cores..."
                value={observacao}
                onChangeText={observacao => setObservacao(observacao)}
            />

            <View style={styles.containerValor}>
                <TextInput
                    style={[styles.button, styles.buttonValor]}
                    placeholder="Preço"
                    value={preco}
                    onChangeText={preco => setPreco(preco)}
                />
                <TextInput
                    style={[styles.button, styles.buttonValor]}
                    placeholder="Desconto"
                    value={desconto}
                    onChangeText={desconto => setDesconto(desconto)}
                />
            </View>

            <View style={[styles.anexo, styles.button]}>
                {imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${imagem}` }}
                        style={{ height: "100%", width: "100%" }}
                    />
                    : <Icon style={styles.icon} name="camera" size={80} color='#555' />}
            </View>

            <GradientButton buttonStyle={styles.buttonFoto}>
                <TouchableOpacity onPress={() => navigation.navigate('Camera', {
                    route: 'Cadastro Produto'
                })}>
                    <Text style={styles.foto}>
                        Capturar
                    </Text>
                </TouchableOpacity>
            </GradientButton>

            <GradientButton buttonStyle={styles.buttonSalvar}>
                <TouchableOpacity onPress={handleCadastrar}>
                    <Text style={styles.registrar}>
                        {id ? 'Editar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
            </GradientButton>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    containerValor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    button: {
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        fontSize: 15
    },
    buttonValor: {
        flex: 1
    },
    anexo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center'
    },
    foto: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    buttonFoto: {
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    registrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    },
    buttonSalvar: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        marginVertical: 10,
        color: 'black',
        alignItems: 'center',
    }
});
