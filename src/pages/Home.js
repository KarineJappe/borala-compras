import React from 'react';
import Gradient from '../utils/gradientFundo'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

const Home = ({ navigation }) => {
    return (
        <Gradient>
            <Image
                style={styles.logo}
                source={require('../assets/img/Logo.png')}
            />

            <TouchableOpacity onPress={() => navigation.navigate('AuthLoading')}>
                <Text style={styles.button}>
                    Lojista
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cliente')}>
                <Text style={styles.button}>
                    Cliente
                </Text>
            </TouchableOpacity>
        </Gradient>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        width: 229,
        height: 55,
        marginTop: 20,
        backgroundColor: '#ffff',
        color: 'black',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: 25
    },
    logo: {
        marginTop: 100,
        marginBottom: 50,
    }
});

export default Home;
