import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEstabelecimento } from '../../services/estabelecimento';

export default function Categorias() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const { data } = await getEstabelecimento();

        setData(data.data);
    }, []);

    const Item = ({ data }) => (
        <View style={styles.item}>
            <View style={[styles.anexo, styles.button]}>
                {data.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${data.imagem}` }}
                        style={{ height: "100%", width: "100%" }}
                    />
                    : <Icon
                        style={styles.icon} name="camera" size={80} color='#555'
                    />
                }
            </View>
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
        padding: 10,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    button: {
        borderRadius: 10,
        height: 100,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    anexo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center'
    },
});
