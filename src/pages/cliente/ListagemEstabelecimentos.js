import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEstabelecimento, getEstabelecimentoByIdCategoria } from '../../services/estabelecimento';
import { TextMask } from 'react-native-masked-text';

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
            <View style={styles.foto}>
                {data.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${data.imagem}` }}
                        style={styles.imagem}
                    />
                    : <Icon
                        name="camera"
                        size={80}
                        color='#555'
                    />
                }
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{data.nome_fantasia}</Text>
                <Text> Endereço: {data.endereco}</Text>
                <Text>
                    <TextMask
                        type={"cel-phone"}
                        value={data.telefone}
                        options={{
                            maskType: 'BRL',
                        }}
                    />
                    <Text>  </Text>
                    <Icon
                        name="whatsapp"
                        size={20}
                        color='green' />
                </Text>
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
                ListEmptyComponent={
                    <View style={styles.message}>
                        <Text>Nenhum estabelecimento cadastrado. </Text>
                    </View>
                }
            />
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
    foto: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    info: {
        padding: 10,
    },
    message: {
        alignItems: 'center',
        marginTop: '50%'
    },
});
