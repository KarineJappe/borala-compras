import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../../utils/gradientButton';
import { registrarProduto, editarProduto } from '../../services/produto';
import { getEstabelecimentoByUserId } from '../../services/estabelecimento';
import { useFocusEffect } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const fieldValidation = yup.object().shape({
    descricao: yup
        .string()
        .required('O email não pode ser vazio')
        .min(2, 'A senha deve conter pelo menos 2 dígitos'),
    observacao: yup
        .string()
        .required('A observação não pode ser vazia'),
    preco: yup
        .string()
        .required('O preço não pode ser vazio')
        .min(2, 'O preço deve conter pelo menos 6 dígitos'),
    desconto: yup
        .string()
        .min(2, 'O desconto deve conter pelo menos 2 dígitos')
})

export default function CadastroProduto({ route, navigation }) {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(fieldValidation) });
    const id = route.params?.itemProduto?.id || false;
    const item_produto = route.params?.itemProduto || false;
    const { id_user, base64 } = route.params;

    const [imagem, setImagem] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const teste = base64 ? base64 : item_produto.imagem || undefined;
            setImagem(teste);
        }, [base64])
    );

    useEffect(() => {
        register('descricao')
        register('observacao')
        register('preco')
        register('descono')
    }, [register])

    const handleCadastrar = async params => {
        if (id) {
            setImagem(base64);
            const { data } = await editarProduto(item_produto.id, {
                descricao: params.descricao,
                observacao: params.observacao,
                preco: params.preco,
                desconto: params.desconto,
                imagem
            });
        } else {
            const estabelecimento = await getEstabelecimentoByUserId(id_user);
            if (estabelecimento.status === 200) {
                const id_estabelecimento = estabelecimento.data.id;
                setImagem(base64);
                const data = await registrarProduto({
                    descricao: params.descricao,
                    observacao: params.observacao,
                    preco: params.preco,
                    desconto: params.desconto,
                    id_estabelecimento,
                    imagem
                });
            } else {
            }
        };

        navigation.dispatch(
            CommonActions.navigate({
                name: 'Produtos',
            })
        );
    };

    return (
        <View style={styles.mainContainer}>

            <TextField
                label={"Descrição"}
                error={errors?.descricao}
                placeholder={"Descrição"}
                onChangeText={text => setValue('descricao', text)}
            />
            <TextField
                label={"Observações"}
                error={errors?.observacao}
                placeholder={"Observações: tamanhos, cores..."}
                onChangeText={text => setValue('observacao', text)}
            />
            <View style={styles.containerValor}>
                <View style={styles.inputValor}>
                    <TextField
                        label={"Preço"}
                        error={errors?.preco}
                        placeholder={"Preço"}
                        onChangeText={text => setValue('preco', text)}
                    />
                </View>
                <View style={styles.inputValor}>
                    <TextField
                        label={"Desconto"}
                        error={errors?.desconto}
                        placeholder={"Desconto"}
                        onChangeText={text => setValue('desconto', text)}
                    />
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Imagem</Text>
                {imagem ?
                    <View style={[styles.anexo, styles.imagem]}>
                        <Image
                            source={{ uri: `data:image/png;base64,${imagem}` }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>
                    :
                    <View style={[styles.anexo, styles.imagem]}>
                        <Icon
                            style={styles.icon} name="camera" size={80} color='#555'
                            onPress={() => navigation.navigate('Camera', {
                                route: 'Cadastro Produto'
                            })} />
                    </View>
                }
            </View>

            <GradientButton buttonStyle={styles.buttonSalvar}>
                <TouchableOpacity onPress={handleSubmit(handleCadastrar)}>
                    <Text style={styles.registrar}>
                        {id ? 'Editar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
            </GradientButton>
        </View>
    );
};

const TextField = ({ error, label, ...inputProps }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, !!error && styles.borderError]}
            {...inputProps}
        />
        {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: '5%',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: 'black',
        marginBottom: 4
    },
    input: {
        height: 40,
        fontSize: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    imagem: {
        height: 200,
        fontSize: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    containerValor: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputValor: {
        width: '44%',
        alignItems: 'center'
    },
    container: {
        width: '80%',
        borderRadius: 10,
        marginBottom: 10
    },
    borderError: {
        borderWidth: 1,
        borderColor: 'rgba(200,0,50,1)'
    },
    errorMessage: {
        fontSize: 10,
        color: 'rgba(200,0,50,1)',
        textAlign: 'center',
        marginTop: 5
    },
    anexo: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center'
    },
    registrar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    },
    buttonSalvar: {
        padding: 8,
        margin: 10,
        borderRadius: 10,
        marginVertical: 10,
        color: 'black',
        alignItems: 'center',
    }
});
