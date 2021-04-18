import request from './api'

export const getUsuario = async () =>
    await request('get', '/usuarios')

export const createUsuario = async ususario =>
    await request('post', 'usuarios', ususario)

export const updateusuario = async (id, usuario) =>
    await request('put', `/usuarios/${id}`, usuario)

export const deleteUsuario = async id =>
    await request('delete', `usuarios/${id}`)

