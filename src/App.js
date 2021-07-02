import React from 'react'
import Routes from './routes';
import { Provider, configureFonts, DefaultTheme } from 'react-native-paper';

export default function App() {
    const fontConfig = {
        android: {
            regular: {
                fontFamily: 'Poppins-Regular',
                fontWeight: 'normal'
            }
        }
    }
    const theme = {
        ...DefaultTheme, fonts: configureFonts(fontConfig)
    }
    return (
        <Provider theme={theme} >
            <Routes />
        </Provider>
    );
}