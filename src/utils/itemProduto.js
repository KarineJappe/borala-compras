import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import GradientButton from './gradientButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteProduto } from '../services/produto';

export default function ItemProduto({ produto, carregaProdutos, navegar }) {

    const handleExcluir = async () => {
        await deleteProduto(produto.id);
        carregaProdutos();
    };

    const handleEditar = async () => {
        navegar.navigate('Cadastro Produto', {
            itemProduto: produto
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <Image style={styles.imagem} source={{ uri: `data:image/png;base64,${produto.imagem}` }} />
                <View style={styles.info}>
                    <Text style={styles.descricao}>{produto.descricao}</Text>
                    <Text>
                        {
                            produto.desconto > 0
                                ?
                                <>
                                    <Text style={{ color: 'green', textDecorationLine: 'line-through' }}>R${produto.preco} </Text>
                                    |
                                    <Text style={{ color: 'red' }}> R${Number(produto.preco - (produto.desconto || 0)).toFixed(2)}</Text>
                                </>
                                :
                                <Text style={{ color: 'green' }}>R${produto.preco}</Text>
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.containerButtons}>
                <GradientButton buttonStyle={styles.button}>
                    <TouchableOpacity onPress={handleEditar} >
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    <Icon name="pencil" size={15} color="black" />
                </GradientButton>
                <GradientButton buttonStyle={styles.button}>
                    <TouchableOpacity onPress={handleExcluir}>
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                    <Icon name="trash" size={15} color="black" />
                </GradientButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
    },
    containerItem: {
        backgroundColor: '#eee',
        borderRadius: 5,
        margin: 10,
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        display: 'flex',
        flex: 1
    },
    button: {
        padding: 5,
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    imagem: {
        height: 120,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignSelf: 'center',
    },
    info: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 5,
        padding: 10
    },
    descricao: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});