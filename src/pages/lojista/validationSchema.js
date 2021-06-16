import * as yup from 'yup';

export const createValidationSchema = yup.object().shape({
    razao_social: yup
        .string()
        .required('A razão social não pode ser vazio')
        .min(6, 'A Razão Socia deve conter pelo menos 6 digitosl'),
    nome_fantasia: yup
        .string()
        .required('O nome fantasia não pode ser vazia')
        .min(6, 'A senha deve conter pelo menos 6 dígitos'),
    cnpj: yup
        .string()
        .required('O cnpj não pode ser vazio')
        .min(6, 'O Cnpj deve conter pelo menos 6 dígitos'),
    endereco: yup
        .string()
        .required('O endereço não pode ser vazia')
        .min(6, 'O endereço deve conter pelo menos 6 dígitos'),
    telefone: yup
        .string()
        .required('O telefone não pode ser vazia')
        .min(6, 'O telefone deve conter pelo menos 6 dígitos'),
    email: yup
        .string()
        .required('O email não pode ser vazio')
        .email('Digite um email válido'),
    password: yup
        .string()
        .required('A senha não pode ser vazia')
        .min(4, 'A senha deve conter pelo menos 6 dígitos')
})

export const editValidationSchema = yup.object().shape({
    razao_social: yup
        .string()
        .required('A razão social não pode ser vazio')
        .min(6, 'A Razão Socia deve conter pelo menos 6 digitosl'),
    nome_fantasia: yup
        .string()
        .required('O nome fantasia não pode ser vazia')
        .min(6, 'A senha deve conter pelo menos 6 dígitos'),
    cnpj: yup
        .string()
        .required('O cnpj não pode ser vazio')
        .min(6, 'O Cnpj deve conter pelo menos 6 dígitos'),
    endereco: yup
        .string()
        .required('O endereço não pode ser vazia')
        .min(6, 'O endereço deve conter pelo menos 6 dígitos'),
    telefone: yup
        .string()
        .required('O telefone não pode ser vazia')
        .min(6, 'O telefone deve conter pelo menos 6 dígitos'),
})
