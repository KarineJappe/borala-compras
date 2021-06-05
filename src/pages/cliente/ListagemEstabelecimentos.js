import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    FlatList
} from 'react-native';
import { getEstabelecimento } from '../../services/estabelecimento';

export default function Categorias() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const { data } = await getEstabelecimento();

        setData(data.data);
    }, []);

    const Item = ({ data }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{data.nome_fantasia}</Text>
            <Text>{data.endereco}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item data={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#ddd',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});
