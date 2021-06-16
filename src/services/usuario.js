import request from './api'

//Login de usuários no APP.
export const login = async usuario =>
    await request('post', '/users/login', usuario);

//Registrar um novo usuário no APP.
export const registrarUsuario = async ususario =>
    await request('post', '/users/register', ususario);


// export const getUsuario = asynclogin(credentials) () =>
//     await request('get', '/usuarios')

// export const createUsuario = async ususario =>
//     await request('post', 'usuarios', ususario)

export const editarUsuario = async (id, usuario) =>
    await request('put', `/usuarios/${id}`, usuario)

// export const deleteUsuario = async id =>
//     await request('delete', `usuarios/${id}`)

