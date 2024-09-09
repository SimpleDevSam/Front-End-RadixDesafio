
# Front-end Gerenciamento de Tarefas

## Introdução

Este é o front-end de um projeto de gerenciamento de tarefas, desenvolvido para uma entrevista técnica na Radix.

## Funcionalidades
- **Gerenciamento de Tarefas:**
  -    Adicionar tarefas 
  -    Excluir tarefas
  -  Listar todas as tarefas
  -  Atualizar tarefas
 - **Integração com notícias:**
   -    Exibe notícias relacionadas às palavras-chave das tarefas.

## Variáveis de ambiente
- REACT_APP_API_URL_PROD=https://back-end-h5fu.onrender.com/
- REACT_APP_API_URL_DEV=http://localhost:3001
  
## Instalação

1. Clone o repositório:
 `git clone git clone https://github.com/SimpleDevSam/Front-End-RadixDesafio `
  2. Instalar dependências:
 `npm install`
 3. Rodar projeto em dev:
 `npm run start:dev ou npm run start `
 Para visualizar, abra navegador [neste link](http://localhost:3000)
  4. Compilar para prod:
 `npm run build`

##Dependências/bibliotecas

-   **react**: biblioteca utilizada para criar e rodar o projeto.
-   **react-dom e react-router-dom**: pacotes do react para manipulação de DOM e roteamento.
-   **react-icons**: repositório de ícones utilizados.
-   **react-toastify**: pacote do toastify em react para mostrar mensagens de erro dinâmicas.
-   **typescript**: biblioteca usada para habilitar o uso de typescript no projeto, facilitando a tipagem.
-   **yup**: biblioteca utilizada para criar schemas a serem validados.
-   **formik**: biblioteca utlizada para gerenciar formulários, seu estado e em conjunto com yup, realizar a validação em client-side.
-   **axios**: biblioteca utilizada para realizar chamadas http.
-   **uuid**: Para gerar IDs únicos para as tarefas.