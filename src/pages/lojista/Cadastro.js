import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import GradientButton from '../../utils/gradientButton';


export default function Categorias(){
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.button} 
                placeholder="Cnpj"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Razão Social"
            />
            <TextInput 
                style={styles.button} 
                placeholder="Nome Fantasia"
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
            />
            <GradientButton>
                <TouchableOpacity>
                    <Text style={styles.buttonEntrar}>
                        Registrar
                    </Text>
                </TouchableOpacity>
            </GradientButton>
        </View>

    );
}

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
