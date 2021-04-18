import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import GradientButton from '../../utils/gradientButton';
import {createUsuario} from '../../services/usuario';


export default function Cadastro(){
    const [email, setEmail] = useState ("");
    const [senha, setSenha] = useState ("");

    const handleRegistrar = async () => {
        const {data} = await createUsuario({email, senha});
        console.log(data);
    };

    const handleEmail = (email) =>{
        setEmail(email)
    };
    const handleSenha = (senha) =>{
        setSenha(senha)
    };

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.button} 
                placeholder="Razão Social"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Nome Fantasia"
                name="nome_fantasia"
            />
            <TextInput
                style={styles.button} 
                placeholder="Cnpj" 
                name="cnpj"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Endereço"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Telefone"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Email"
                onChangeText={handleEmail}
                value={email}
            />
            <TextInput 
                style={styles.button} 
                placeholder="Senha"
                onChangeText={handleSenha}
                value={senha}
            />
        
            <GradientButton>
                <TouchableOpacity onPress = {handleRegistrar}>
                    <Text style={styles.buttonEntrar}>
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
    buttonEntrar:{
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    }
});
