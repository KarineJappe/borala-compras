import React, { useState } from 'react';
import {
    Linking,
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEstabelecimentoById } from '../../services/estabelecimento';


export default function Detlahes({ route }) {
    const produto = route.params?.produto;
    const id_estabelecimento = route.params?.id_estabelecimento;
    const [loading, setLoading] = useState(false);

    const contatoWhatsApp = async () => {
        setLoading(true);
        try {
            if (id_estabelecimento) {
                const { data } = await getEstabelecimentoById(id_estabelecimento);

                let url = 'whatsapp://send?text=' +
                    "Olá, tenho interesse no item "
                    + produto.descricao
                    + " anunciado no app BoraLá. Ainda está disponível?"
                    + '&phone=55'
                    + data.telefone;
                Linking.openURL(url);
            }
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.item}>
            <View style={styles.foto}>
                {produto.imagem ?
                    <Image
                        source={{ uri: `data:image/png;base64,${produto.imagem}` }}
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
                <Text style={styles.descricao}>{produto.descricao}</Text>
                <Text style={styles.observacao}>{
                    produto.observacao ?
                        produto.observacao
                        :
                        "Sem observações"}
                </Text>
                <Text>
                    {produto.desconto > 0
                        ?
                        <>
                            <Text style={{ color: 'green', textDecorationLine: 'line-through' }}>R${produto.preco} </Text>
                            |
                            <Text style={{ color: 'red' }}> R${Number(produto.preco - (produto.desconto || 0)).toFixed(2)}</Text>
                        </>
                        :
                        <Text style={{ color: 'green' }}>R${produto.preco}</Text>
                    }
                </Text>
                <Text style={{ marginTop: 10 }}>
                    Tem interesse no produto {produto.descricao}?{'\n'}
                    Entre em contato com o vendedor através do WhatsApp no botão abaixo.
                </Text>
                <TouchableOpacity disabled={loading} style={styles.button} onPress={contatoWhatsApp}>
                    {loading
                        ?
                        <ActivityIndicator size="small" color="green" />
                        :
                        <Text styles={styles.contato}>
                            Contato
                            <Text> </Text>
                            <Icon
                                name="whatsapp"
                                size={20}
                                color='green' />
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eee',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    foto: {
        height: 400,
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
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    descricao: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    observacao: {
        fontSize: 18,
        marginBottom: 4
    },
    button: {
        padding: 10,
        margin: 10,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
        width: 150,
        height: 55,
        alignItems: 'center',
    },
    contato: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
    }
})