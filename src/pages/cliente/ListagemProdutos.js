import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduto, getProdutosByEstabelecimentoId } from '../../services/produto';

export default function Categorias({ route }) {
    const [data, setData] = useState([]);
    const id_estabelecimento = route.params?.id_estabelecimento;

    useFocusEffect(
        React.useCallback(() => {
            const handleProdutos = async () => {
                let response = [];
                try {
                    if (id_estabelecimento) {
                        response = await getProdutosByEstabelecimentoId(id_estabelecimento);
                    } else {
                        response = await getProduto();
                    }
                } catch (exception) {
                }
                setData(response.data);
            };
            handleProdutos();
        }, [id_estabelecimento])
    );

    const Item = ({ data }) => (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <View style={styles.foto} >
                    {data.imagem ?
                        <Image
                            source={{ uri: `data:image/png;base64,${data.imagem}` }}
                            style={styles.imagem}
                        />
                        :
                        <Icon
                            name="camera"
                            size={80}
                            color='#555'
                        />
                    }
                </View>
                <View style={styles.info}>
                    <Text style={styles.descricao}>{data.descricao}</Text>
                    <Text style={styles.observacao}>{
                        data.observacao ?
                            data.observacao
                            :
                            "Sem observações"}
                    </Text>
                    <Text>
                        {data.desconto > 0
                            ?
                            <>
                                <Text style={{ color: 'green', textDecorationLine: 'line-through' }}>R${data.preco} </Text>
                                |
                                <Text style={{ color: 'red' }}> R${Number(data.preco - (data.desconto || 0)).toFixed(2)}</Text>
                            </>
                            :
                            <Text style={{ color: 'green' }}>R${data.preco}</Text>
                        }
                    </Text>
                </View>
            </View >
        </View>
    );

    const renderItem = ({ item }) => (
        <Item data={item} />
    );

    return (
        <SafeAreaView style={styles.containerFlatList}>
            <FlatList
                style={styles.listaProdutos}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                ListEmptyComponent={
                    <View style={styles.message}>
                        <Text>Nenhum produto cadastrado. </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerFlatList: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#ddd',
    },
    listaProdutos: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
        maxWidth: '50%',
    },
    containerItem: {
        backgroundColor: '#eee',
        borderRadius: 5,
        margin: 10,
        minHeight: 260
    },
    foto: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        height: 150,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignSelf: 'center',
    },
    info: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    },
    descricao: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    observacao: {
        fontSize: 12,
        marginBottom: 4
    },
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
