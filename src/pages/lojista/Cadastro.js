import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import GradientButton from '../../utils/gradientButton';
import {register} from '../../services/usuario';
import {registrarEstabelecimento} from '../../services/estabelecimento';


export default function Cadastro({navigation}){
    //States do Usuário
    const [email, setEmail] = useState ("");
    const [password, setpassword] = useState ("");

    //States do estabelecimento.
    const [razao_social, setRazao_social] = useState ("");
    const [nome_fantasia, setNome_fantasia] = useState ("");
    const [cnpj, setCnpj] = useState ("");
    const [endereco, setEndereco] = useState ("");
    const [telefone, setTelefone] = useState ("");


    const handleRegistrar = async () => {
        const resUsuario = await register({email, password});

        if(resUsuario.status === 201){
            const id_user = resUsuario.data.user.id;

            const {data} = await registrarEstabelecimento({razao_social, nome_fantasia, cnpj, endereco, telefone, id_user});
            // console.log(data);
        }
    };

    return(
        <View style={styles.container}>

            <TextInput 
                style={styles.button} 
                placeholder="Razão Social"
                value={razao_social}
                onChangeText={razao_social => setRazao_social(razao_social)}
            />
            <TextInput 
                style={styles.button} 
                placeholder="Nome Fantasia"
                value={nome_fantasia}
                onChangeText={nome_fantasia => setNome_fantasia(nome_fantasia)}
            />
            <TextInput
                style={styles.button} 
                placeholder="Cnpj" 
                value={cnpj}
                onChangeText={cnpj => setCnpj(cnpj)}
            />
            <TextInput 
                style={styles.button} 
                placeholder="Endereço"
                value={endereco}
                onChangeText={endereco => setEndereco(endereco)}
            />
            <TextInput 
                style={styles.button} 
                placeholder="Telefone"
                value={telefone}
                onChangeText={telefone => setTelefone(telefone)}
            />
            <TextInput 
                style={styles.button} 
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput 
                style={styles.button} 
                placeholder="password"
                onChangeText={password => setpassword(password)}
                value={password}
            />
        
            <GradientButton buttonStyle={styles.buttonEntrar}>
                {/* <TouchableOpacity onPress = {handleRegistrar}> */}
                <TouchableOpacity onPress = {() => navigation.navigate('Produtos')}>
                    <Text style={styles.registrar}>
                        Registrar
                    </Text>
                </TouchableOpacity>
            </GradientButton>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    button: {
        padding: 5,
        borderRadius: 10,
        width: 288,
        height: 35,
        marginTop: 20,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        fontSize: 15
    },
    registrar:{
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    },
    buttonEntrar: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        marginTop: 20,
        color: 'black',
        alignItems: 'center',
    },
    
});
