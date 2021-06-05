import React from 'react'
import Routes from './routes';
import { Provider } from 'react-native-paper';

export default function App() {
    return (
        <Provider>
            <Routes />
        </Provider>
    );
}