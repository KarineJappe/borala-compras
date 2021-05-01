import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import GradientButton from './gradientButton';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ItemProduto({ produto }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <Image style={styles.imagem} source={{ uri: produto.imagem }} />
                <View style={styles.info}>
                    <Text style={styles.descricao}>{produto.descricao}</Text>
                    <Text>Preco {produto.preco}</Text>
                </View>
            </View>
            <View style={styles.containerButtons}>
                <GradientButton buttonStyle={styles.button}>
                    <TouchableOpacity>
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    <Icon name="pencil" size={15} color="black" />
                </GradientButton>
                <GradientButton buttonStyle={styles.button}>
                    <TouchableOpacity>
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                    <Icon name="trash" size={15} color="black" />
                </GradientButton>
            </View>
        </View>
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
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        display: 'flex',
        flex: 1
    },
    button: {
        padding: 5,
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    imagem: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignSelf: 'center',
    },
    info: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 10,
    },
    descricao: {
        fontWeight: 'bold',
        fontSize: 14,
    },

});