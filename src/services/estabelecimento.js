import request from './api'

export const getEstabelecimento = async () =>
    await request('get', '/estabelecimentos')

export const getEstabelecimentoById_user = async id_user =>
    await request('get', `/estabelecimentos/user/${id_user}`)

export const registrarEstabelecimento = async ususario =>
    await request('post', '/estabelecimentos', ususario)

export const editarEstabelecimento = async (id, estabelecimento) =>
    await request('put', `/estabelecimentos/${id}`, estabelecimento)

export const deleteEstabelecimento = async id =>
    await request('delete', `/estabelecimentos/${id}`)

