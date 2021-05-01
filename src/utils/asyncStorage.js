import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from '@react-navigation/native';


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

export function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

export function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}
