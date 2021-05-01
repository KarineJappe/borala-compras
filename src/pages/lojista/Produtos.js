import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import { getProduto } from '../../services/produto';
import ItemProduto from '../../utils/itemProduto';
import GradientButton from '../../utils/gradientButton';


export default function Produtos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const { data } = await getProduto();
            setData(data.data);
        }
        loadProducts();
    }, []);

    const renderListItem = ({ item }) => <ItemProduto produto={item} />;
    return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <GradientButton buttonStyle={styles.buttonCadastrar}>
                    <TouchableOpacity>
                        <Text>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </GradientButton>
            </View>
            <FlatList
                style={styles.listaProdutos}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderListItem}
                numColumns={2}
                columnWrapperStyle={styles.flatList}
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
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 50,
        marginTop: 20,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    }
});
