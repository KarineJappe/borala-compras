import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AuthLoading({ navigation }) {

    useEffect(() => {
        async function handleUserNextScreen() {
            const userToken = await AsyncStorage.getItem('@App:token');
            console.log("Token " + userToken);

            navigation.navigate(userToken ? 'Produtos' : 'Login');
        }

        handleUserNextScreen();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgba(15,136,147,1)" />
        </View>
    );
}

AuthLoading.navigationOptions = () => {
    return {
        header: null,
    };
};