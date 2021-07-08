import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { getProdutosByEstabelecimentoId } from '../../services/produto';
import { FAB } from 'react-native-paper';
import ItemProduto from '../../utils/itemProduto';

export default function Produtos({ route, navigation }) {
    const estabelecimento = route.params?.estabelecimento;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscaProdutos = async () => {
        setLoading(true);
        try {
            if (estabelecimento) {
                const { data } = await getProdutosByEstabelecimentoId(estabelecimento);
                setData(data);
            }
        } catch (exception) {
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            buscaProdutos();
        }, [estabelecimento])
    );

    const renderListItem = ({ item }) => <ItemProduto produto={item} carregaProdutos={buscaProdutos} navegar={navigation} />;
    return (
        <View style={styles.container}>
            {loading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="rgba(15,136,147,1)" />
                </View>
                :
                <FlatList
                    style={styles.listaProdutos}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderListItem}
                    numColumns={2}
                    ListEmptyComponent={
                        <View style={styles.message}>
                            <Text>Nenhum produto cadastrado. </Text>
                        </View>
                    }
                />
            }
            <FAB
                label="Cadastrar"
                style={styles.buttonCadastrar}
                icon="plus"
                onPress={() => navigation.navigate('Cadastro Produto', {
                    id_user: route.params.user
                })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#ddd',
    },
    listaProdutos: {
        flex: 1,
    },
    buttonCadastrar: {
        position: 'absolute',
        elevation: 3,
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15,136,147,1)',
        fontFamily: 'Poppins-Regular',
    },
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
