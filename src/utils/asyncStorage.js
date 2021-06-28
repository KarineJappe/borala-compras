import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUser() {
    try {
        return await AsyncStorage.getItem('@App:token');
    } catch (e) {
        throw e;
    }
}

export async function storeUser(token) {
    try {
        return await AsyncStorage.setItem('@App:token', JSON.stringify(token));
    } catch (e) {
        throw e;
    }
}

export async function deleteUser() {
    try {
        return await AsyncStorage.removeItem('@App:token');
    } catch (e) {
        throw e;
    }
}

// NavigationService

export function navigate(routeName, params) {
    navigationRef.current?.navigate(routeName, params);
}

export const navigationRef = React.createRef();