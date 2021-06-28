import request from './api'

export const getCategoria = async () =>
    await request('get', '/categorias')
