import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCategoria } from '../../services/categoria';

export default function Categorias({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(async () => {
        setLoading(true);
        try {
            const { data } = await getCategoria();
            setData(data.data);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }, []);

    const Item = ({ data }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Estabelecimentos', {
                id_categoria: data.id,
                categoria: data.descricao
            })}
        >
            <View style={styles.anexo}>
                {data.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${data.imagem}` }}
                        style={styles.imagem}
                    />
                    : <Icon
                        style={styles.icon}
                        name="camera"
                        size={80}
                        color='#555'
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
            {loading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="rgba(15,136,147,1)" />
                </View>
                :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <View style={styles.message}>
                            <Text>Nenhuma categoria cadastrada. </Text>
                        </View>
                    }
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    item: {
        backgroundColor: '#eee',
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
    message: {
        alignItems: 'center',
        marginTop: '80%'
    },
});
