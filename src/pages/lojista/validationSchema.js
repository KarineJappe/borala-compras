import * as yup from 'yup';

export const createValidationSchema = yup.object().shape({
    razao_social: yup
        .string()
        .required('A Razão Social não pode ser vazia.')
        .min(6, 'A Razão Social deve conter pelo menos 6 digitos.'),
    nome_fantasia: yup
        .string()
        .required('O Nome Fantasia não pode ser vazio.')
        .min(6, 'O Nome Fantasia deve conter pelo menos 6 dígitos.'),
    cnpj: yup
        .string()
        .required('O CNPJ não pode ser vazio.')
        .min(14, 'O CNPJ deve conter 14 dígitos'),
    endereco: yup
        .string()
        .required('O endereço não pode ser vazia.')
        .min(6, 'O endereço deve conter pelo menos 6 dígitos.'),
    telefone: yup
        .string()
        .required('O telefone não pode ser vaziao.')
        .min(8, 'O telefone deve conter pelo menos 8 dígitos.'),
    categoria: yup
        .string()
        .required('A categoria não pode ser vazia.'),
    email: yup
        .string()
        .required('O email não pode ser vazio.')
        .email('Digite um email válido'),
    password: yup
        .string()
        .required('A senha não pode ser vazia.')
        .min(4, 'A senha deve conter pelo menos 6 dígitos.')
});

export const editValidationSchema = yup.object().shape({
    razao_social: yup
        .string()
        .required('A razão social não pode ser vazio')
        .min(6, 'A Razão Socia deve conter pelo menos 6 digitosl'),
    nome_fantasia: yup
        .string()
        .required('O nome fantasia não pode ser vazio.')
        .min(6, 'O Nome Fantasia deve conter pelo menos 6 dígitos.'),
    cnpj: yup
        .string()
        .required('O CNPJ não pode ser vazio.')
        .min(6, 'O CNPJ deve conter pelo menos 6 dígitos.'),
    endereco: yup
        .string()
        .required('O endereço não pode ser vazio.')
        .min(6, 'O endereço deve conter pelo menos 6 dígitos.'),
    telefone: yup
        .string()
        .required('O telefone não pode ser vazio')
        .min(8, 'O telefone deve conter pelo menos 8 dígitos'),
});
