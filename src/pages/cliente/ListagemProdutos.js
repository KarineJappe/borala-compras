import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduto } from '../../services/produto';

export default function Categorias() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const { data } = await getProduto();

        setData(data.data);
    }, []);

    const Item = ({ data }) => (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <View style={styles.imagem}>
                    {data.imagem ?
                        <Image
                            source={{ uri: `data:image/png;base64,${data.imagem}` }}
                            style={{ height: "100%", width: "100%" }}
                        />
                        :
                        <Icon style={styles.icon} name="camera" size={80} color='#555' />
                    }

                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{data.descricao}</Text>
                    <Text>Preco {data.preco}</Text>
                </View>
            </View >
        </View>
    );

    const renderItem = ({ item }) => (
        <Item data={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
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
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
    },
    containerItem: {
        backgroundColor: '#eee',
        borderRadius: 3,
        margin: 10,
        padding: 10
    },
    listaProdutos: {
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    imagem: {
        height: 150,
        width: 150,
        borderRadius: 5,
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        alignItems: 'center'
    },
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
