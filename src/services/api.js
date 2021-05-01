import axios from 'axios';
import { Alert } from 'react-native'

import { getUser, navigate, deleteUser } from '../utils/asyncStorage';

const api = axios.create({
    baseURL: 'http://10.0.2.2:8000',
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
            )
        }

        if (error.response.status === 401) {
            const requestConfig = error.config

            // O token JWT expirou

            deleteUser().then(() => {
                navigate('AuthLoading', {})
            })

            return axios(requestConfig)
        }

        return Promise.reject(error)
    },
)

api.interceptors.request.use(

    config => {
        return getUser()
            .then(user => {
                user = JSON.parse(user)
                if (user && user.token)
                    console.log("token" + user.token);

                config.headers.Authorization = `Bearer ${user.token}`
                return Promise.resolve(config)
            })
            .catch(error => {
                return Promise.resolve(config)
            })
    },
    error => {
        return Promise.reject(error)
    },
)

export default request = (method, endpoint, data) => {
    return api[method](endpoint, data)
        .then(response => (response))
        .catch(({ response }) => response)
}