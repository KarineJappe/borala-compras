import React, { useState } from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteProduto } from '../services/produto';
import { Dialog, Paragraph, Portal, Button } from 'react-native-paper';

export default function ItemProduto({ produto, carregaProdutos, navegar }) {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleExcluir = async () => {
        await deleteProduto(produto.id);
        carregaProdutos();
        hideDialog();
    };

    const handleEditar = async () => {
        navegar.navigate('Cadastro Produto', {
            itemProduto: produto
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <View style={styles.foto}>
                    {produto.imagem ?
                        <Image
                            source={{ uri: `data:image/png;base64,${produto.imagem}` }}
                            style={styles.imagem}
                        />
                        :
                        <Icon
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
                </View>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity onPress={handleEditar} style={styles.button}>
                    <Text style={{ color: "#eee" }}>Editar</Text>
                    <Icon name="pencil" size={15} color="#eee" />
                </TouchableOpacity>

                <TouchableOpacity onPress={showDialog} style={styles.button}>
                    <Text style={{ color: "#eee" }}>Excluir</Text>
                    <Icon name="trash" size={15} color="#eee" />
                </TouchableOpacity>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Aviso.</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Deseja realmente excluir o produto: {produto.descricao}? </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button color={'rgba(15,136,147,1)'} onPress={handleExcluir}>sim</Button>
                            <Button color={'rgba(15,136,147,1)'} onPress={hideDialog}>Não</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
        maxWidth: '50%'
    },
    containerItem: {
        backgroundColor: '#eee',
        borderRadius: 5,
        margin: 10,
        minHeight: 260
    },
    foto: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        display: 'flex',
        flex: 1,
    },
    button: {
        backgroundColor: 'rgba(15,136,147,1)',
        padding: 5,
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    imagem: {
        height: 150,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignSelf: 'center',
    },
    info: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    },
    descricao: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    observacao: {
        fontSize: 12,
        marginBottom: 4
    },
});