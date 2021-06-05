import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { getProduto } from '../../services/produto';
import { FAB } from 'react-native-paper';
import ItemProduto from '../../utils/itemProduto';

export default function Produtos({ navigation }) {
    const [data, setData] = useState([]);

    const carregaProdutos = async () => {
        try {
            const { data } = await getProduto();
            setData(data.data);
        } catch (exception) {
            // console.log(exception);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregaProdutos();
        }, [])
    );

    const renderListItem = ({ item }) => <ItemProduto produto={item} carregaProdutos={carregaProdutos} navegar={navigation} />;
    return (
        <View style={styles.container}>

            <FlatList
                style={styles.listaProdutos}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderListItem}
                numColumns={2}
                columnWrapperStyle={styles.flatList}
                ListEmptyComponent={
                    <View style={styles.message}>
                        <Text>Nenhum produto cadastrado. </Text>
                    </View>
                }
            />

            <FAB
                label="Cadasttrar"
                style={styles.buttonCadastrar}
                icon="plus"
                onPress={() => navigation.navigate('Cadastro Produto')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#ddd',
    },
    containerButton: {
        flexDirection: 'row-reverse'
    },
    listaProdutos: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        justifyContent: 'space-around'
    },
    buttonCadastrar: {
        position: 'absolute',
        elevation: 3,
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15,136,147,1)'
    },
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
