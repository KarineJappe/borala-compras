import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Gradient from './utils/gradientHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/lojista/Cadastro';
import ManterProdutos from './pages/lojista/Produtos';
import Categorias from './pages/cliente/ListagemCategorias';
import AuthLoading from './pages/AuthLoading';
const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="AuthLoading" component={AuthLoading} />
                <Stack.Screen options={{ headerTransparent: true, }} name="Login" component={Login} />
                <Stack.Screen options={{
                    headerBackground: () => (
                        <Gradient />),
                }} name="Cadastro" component={Cadastro} />
                <Stack.Screen options={{
                    headerBackground: () => (
                        <Gradient />),
                }} name="Produtos" component={ManterProdutos} />
                <Stack.Screen options={{
                    headerBackground: () => (
                        <Gradient />),
                }} name="Categorias" component={Categorias} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}