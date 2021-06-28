import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCategoria } from '../../services/categoria';

export default function Categorias({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const { data } = await getCategoria();

        setData(data.data);
    }, []);

    const Item = ({ data }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Estabelecimentos', {
                id_categoria: data.id
            })}
        >
            <View style={styles.anexo}>
                {data.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${data.imagem}` }}
                        style={styles.imagem}
                    />
                    : <Icon
                        style={styles.icon} name="camera" size={80} color='#555'
                    />
                }
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{data.descricao}</Text>
            </View>
        </TouchableOpacity>
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
    card: {
        borderRadius: 10,
        backgroundColor: '#ddd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 10
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    anexo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        height: 120,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignSelf: 'center',
    },
    info: {
        padding: 10,
    },
    icon: {
        alignItems: 'center'
    },
});
