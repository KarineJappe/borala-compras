import request from './api'

export const getProduto = async () =>
    await request('get', '/produtos')

// export const registrarProduto = async ususario =>
//     await request('post', '/produtos', ususario)

// export const updateProduto = async (id, produto) =>
//     await request('put', `/produtos/${id}`, produto)

// export const deleteProduto = async id =>
//     await request('delete', `/produtos/${id}`)

