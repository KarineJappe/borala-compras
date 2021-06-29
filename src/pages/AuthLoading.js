import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { getUser, deleteUser } from '../utils/asyncStorage';
import { useFocusEffect } from '@react-navigation/core';

export default function AuthLoading({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {

            const handleUserLoginScreen = () => {
                deleteUser().then(() => {
                    navigation.navigate('Login');
                });
            };

            const handleUserNextScreen = () => {
                getUser().then(async (dataToken) => {
                    if (dataToken) {
                        try {
                            const user = JSON.parse(dataToken);
                            navigation.navigate('Produtos', {
                                user: user.user.id,
                                estabelecimento: user.user.estabelecimento.id || null
                            });
                        } catch (e) {
                            handleUserLoginScreen();
                        }
                    } else {
                        handleUserLoginScreen();
                    }
                });
            }
            handleUserNextScreen();
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgba(15,136,147,1)" />
        </View>
    );
}