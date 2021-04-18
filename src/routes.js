import React from 'react'
import {NavigationContainer}  from '@react-navigation/native';
import {createStackNavigator}  from '@react-navigation/stack';

import Gradient from  './utils/gradientHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/lojista/Cadastro';
import Categorias from './pages/lojista/ListagemCategorias'
const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"> 
                <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
                <Stack.Screen options={{
                        headerTransparent: true,
                    }} name="Login" component={Login}/>
                <Stack.Screen options={{
                    headerBackground: ()=> (
                        <Gradient/>
                    ),
                }} name="Categorias" component={Categorias}/>
                <Stack.Screen options={{
                    headerBackground: ()=> (
                        <Gradient/>
                    ),
                }} name="Cadastro" component={Cadastro}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}