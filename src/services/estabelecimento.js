import request from './api'

export const getEstabelecimento = async () =>
    await request('get', '/estabelecimentos');

export const getEstabelecimentoById = async id =>
    await request('get', `/estabelecimentos/${id}`);

export const getEstabelecimentoByUserId = async id_user =>
    await request('get', `/estabelecimentos/user/${id_user}`);

export const getEstabelecimentoByIdCategoria = async id_categoria =>
    await request('get', `/estabelecimentos/categoria/${id_categoria}`);

export const registrarEstabelecimento = async ususario =>
    await request('post', '/estabelecimentos', ususario);

export const editarEstabelecimento = async (id, estabelecimento) =>
    await request('put', `/estabelecimentos/${id}`, estabelecimento);

export const deleteEstabelecimento = async id =>
    await request('delete', `/estabelecimentos/${id}`);

