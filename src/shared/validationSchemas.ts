import * as Yup from 'yup';

// Create a Yup validation schema for CreateTask
export const createTaskSchema = Yup.object().shape({
  title: Yup.string()
    .required('O título é obrigatório.')
    .typeError('O título deve ser uma string.'),
  
  keywords: Yup.array()
    .of(Yup.string().required('Palavra-chave não pode estar vazia.'))
    .min(1, 'A lista de palavras-chave não pode estar vazia.')
    .required('A lista de palavras-chave é obrigatória.'),
  

  creationDate: Yup.date()
    .required('A data de criação é obrigatória.')
    .typeError('A data de criação deve ser uma data válida.'),

  updatedDate: Yup.date()
    .required('A data de atualização é obrigatória.')
    .typeError('A data de atualização deve ser uma data válida.'),
});

export const updateTaskSchema = Yup.object().shape({
  id: Yup.string()
    .required('O ID é obrigatório e deve ser uma string válida.'),

  title: Yup.string()
    .required('O título é obrigatório.')
    .typeError('O título deve ser uma string.'),
  
  keywords: Yup.array()
    .of(Yup.string().required('Palavra-chave não pode estar vazia.'))
    .min(1, 'A lista de palavras-chave não pode estar vazia.')
    .required('A lista de palavras-chave é obrigatória.'),

  creationDate: Yup.date()
    .required('A data de criação é obrigatória.')
    .typeError('A data de criação deve ser uma data válida.'),

  updatedDate: Yup.date()
    .required('A data de atualização é obrigatória.')
    .typeError('A data de atualização deve ser uma data válida.'),
});
