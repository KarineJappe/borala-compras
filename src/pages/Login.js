import React from 'react';
import {
    StyleSheet,
    Image,
    Alert,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import Gradient from '../utils/gradientFundo';
import GradientButton from '../utils/gradientButton';

export default function Login({navigation}){
    return(
        <Gradient>
            <Image
                style={styles.logo}
                source={require('../assets/img/Logo.png')}
            />
            
            <TextInput
                style={styles.button} 
                placeholder="Login"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Senha"
            />
            <GradientButton>
                <TouchableOpacity>
                    <Text style={styles.buttonEntrar}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </GradientButton>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text>
                    Registtrre-se
                </Text>
            </TouchableOpacity>
        </Gradient>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 100,
        marginBottom: 50,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: 229,
        height: 55,
        marginTop: 20,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'left',
        fontSize: 22
    },
    buttonEntrar:{
        fontFamily: 'Poppins-Regular',
        fontSize: 22
    }
    
});