import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
// export const navigationRef = React.createRef();


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

let navigator;

export function setTopLevelNavigator(navigationRef) {
    navigator = navigationRef;
}

export function navigate(routeName, params) {
    navigator.current?.dispatch(
        CommonActions.navigate({
            name: routeName,
            params,
        }),
    );
}
