import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEstabelecimento, getEstabelecimentoByIdCategoria } from '../../services/estabelecimento';

export default function Categorias({ route, navigation }) {
    const [data, setData] = useState([]);
    const id_categoria = route.params?.id_categoria || false;

    useFocusEffect(
        React.useCallback(() => {
            const handleEstabelecimentos = async () => {
                let response = [];
                try {
                    if (id_categoria) {
                        response = await getEstabelecimentoByIdCategoria(id_categoria);
                    } else {
                        response = await getEstabelecimento();
                    }
                } catch (exception) {
                }
                setData(response.data);
            };
            handleEstabelecimentos();
        }, [id_categoria])
    );

    const Item = ({ data }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Produtos', {
                id_estabelecimento: data.id
            })}
        >
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
