import request from './api'

export const getProduto = async () =>
    await request('get', '/produtos')

export const getProdutosByEstabelecimentoId = async estabelecimentoId =>
    await request('get', `/produtos/estabelecimento/${estabelecimentoId}`)

export const registrarProduto = async produto =>
    await request('post', '/produtos', produto)

export const editarProduto = async (id, produto) =>
    await request('put', `/produtos/${id}`, produto)

export const deleteProduto = async id =>
    await request('delete', `/produtos/${id}`)

