import request from './api'

//Login de usuários no APP.
export const login = async usuario =>
    await request('post', '/auth/login', usuario);

//Registrar um novo usuário no APP.
export const registrarUsuario = async ususario =>
    await request('post', '/auth/register', ususario);

export const profile = async () =>
    await request('get', '/users/profile');

export const editarUsuario = async (id, usuario) =>
    await request('put', `/usuarios/${id}`, usuario);

