import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './utils/asyncStorage';
import Icon from 'react-native-vector-icons/Fontisto';

import Gradient from './utils/gradientHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/lojista/Cadastro';
import ManterProdutos from './pages/lojista/Produtos';
import CadastroProduto from './pages/lojista/CadastroProduto';
import Camera from './utils/camera';
import Categorias from './pages/cliente/ListagemCategorias';
import Estabelecimentos from './pages/cliente/ListagemEstabelecimentos';
import Produtos from './pages/cliente/ListagemProdutos';
import Detalhes from './pages/cliente/DetalhesProduto';
import Menu from './pages/lojista/MenuLojista'
import AuthLoading from './pages/AuthLoading';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Categorias') {
                        return (
                            <Icon
                                name={focused ? 'nav-icon-list' : 'nav-icon-list'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Estabelecimentos') {
                        return (
                            <Icon
                                name={focused ? 'shopping-store' : 'shopping-store'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Produtos') {
                        return (
                            <Icon
                                name={focused ? 'shopping-bag' : 'shopping-bag'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: 'rgba(15,136,147,1)',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Categorias" component={Categorias} />
            <Tab.Screen name="Estabelecimentos" component={Estabelecimentos} listeners={tabListaners} />
            <Tab.Screen name="Produtos" component={Produtos} listeners={tabListaners} />
        </Tab.Navigator>
    );
};

const tabListaners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name, {
        id_categoria: undefined,
        id_estabelecimento: undefined
    })
})

function Stacks() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Cliente" component={Tabs} />
            <Stack.Screen options={{ headerShown: false }} name="AuthLoading" component={AuthLoading} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={({ navigation }) => ({
                headerTransparent: true,
                headerTitle: false,
                headerLeft: () => (
                    <HeaderBackButton
                        onPress={() => navigation.navigate('Home')}
                    />
                )
            })} name="Login" component={Login} />
            <Stack.Screen options={{ headerBackground: () => (<Gradient />), }} name="Cadastro" component={Cadastro} />
            <Stack.Screen options={({ route, navigation }) => ({
                headerLeft: () => null,
                headerBackground: () => (<Gradient />),
                headerRight: () => (<Menu navigation={navigation} route={route} />),
            })} name="Produtos" component={ManterProdutos} />
            <Stack.Screen options={{ headerBackground: () => (<Gradient />) }} name="Cadastro Produto" component={CadastroProduto} />
            <Stack.Screen options={{ headerBackground: () => (<Gradient />) }} name="Camera" component={Camera} />
            <Stack.Screen options={{ headerBackground: () => (<Gradient />) }} name="Detalhes Produto" component={Detalhes} />
        </Stack.Navigator>
    );
};

export default function Routes() {
    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar
                backgroundColor="rgba(15,136,147,1)"
            />
            <Stacks />
        </NavigationContainer>
    );
};

