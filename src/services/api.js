import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export default request = (method, endpoint, data) => {
    return api[method](endpoint, data)
        .then(response => (response))
        .catch(({ response }) => response)
}