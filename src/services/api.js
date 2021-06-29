import axios from 'axios';
import { Alert } from 'react-native'

import { getUser, navigate, deleteUser } from '../utils/asyncStorage';

const api = axios.create({
    baseURL: 'https://api-borala-compras.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (
            error.request._hasError === true &&
            error.request._response.includes('connect')
        ) {
            Alert.alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores, sem conexão a internet',
                [{ text: 'OK' }],
                { cancelable: false },
            );
        }

        if (error.response.status === 401) {
            const requestConfig = error.config;
            // O token JWT expirou
            Alert.alert(
                'A sessão expirou',
                'Por motivos de segurança você foi desconectado do servidor. Para acessar a sua conta, por favor, faça o login novamente.',
                [{ text: 'OK' }],
                { cancelable: false },
            )
            deleteUser().then(() => {
                navigate('AuthLoading')
            })
            return axios(requestConfig);
        }
        return Promise.reject(error);
    },
)

api.interceptors.request.use(
    config => {
        return getUser()
            .then(dataUser => {
                let user = JSON.parse(dataUser)
                if (user && user.token)
                    config.headers.Authorization = `Bearer ${user.token}`
                return Promise.resolve(config);
            })
            .catch(error => {
                return Promise.resolve(error);
            })
    },
    error => {
        return Promise.reject(error);
    },
)

export default requestt = (method, endpoint, data) => {
    return api[method](endpoint, data)
        .then(response => (response))
        .catch(({ response }) => response)

}