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
                {data.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${data.imagem}` }}
                        style={styles.imagem}
                    />
                    :
                    <Icon style={styles.icon} name="camera" size={80} color='#555' />
                }
                <View style={styles.info}>
                    <Text style={styles.descricao}>{data.descricao}</Text>
                    <Text>
                        <Text style={{ color: 'green' }}>R${data.preco} </Text>
                        |
                        <Text style={{ color: 'red' }}> R${data.desconto}</Text>
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
                columnWrapperStyle={styles.flatList}
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
        elevation: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
    },
    listaProdutos: {
        flex: 1,
    },
    containerItem: {
        backgroundColor: '#eee',
        borderRadius: 3,
        margin: 10,
    },
    flatList: {
        flex: 1,
        justifyContent: 'space-around'
    },
    imagem: {
        height: 120,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignSelf: 'center',
    },
    icon: {
        alignItems: 'center'
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
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
