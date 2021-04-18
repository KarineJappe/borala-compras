import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Categorias(){
    return(
        <>
        <View style={styles.card}>
            <Text>
                Categorias
            </Text>
        </View>
        <View style={styles.card}>
            <Text>
                Categorias
            </Text>
        </View>
        <View style={styles.card}>
            <Text>
                Categorias
            </Text>
        </View>
        <View style={styles.card}>
            <Text>
                Categorias
            </Text>
        </View>
        </>

    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 10,
        backgroundColor: '#ddd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 10

    }
});
