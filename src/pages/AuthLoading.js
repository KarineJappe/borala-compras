import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AuthLoading({ navigation }) {
    useEffect(() => {
        async function handleUserNextScreen() {
            const userToken = await AsyncStorage.getItem('@App:token');

            const user = JSON.parse(userToken);
            if (userToken) {
                navigation.navigate('Produtos', {
                    user: user.user.id,
                    estabelecimento: user.user.estabelecimento.id
                });
            } else {
                navigation.navigate('Login');
            }
        }

        handleUserNextScreen();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgba(15,136,147,1)" />
        </View>
    );
}