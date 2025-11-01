# PPP Gestão de Funcionários API

## Objetivo
API Rest para acompanhamento da gestão de funcionários de uma empresa.

## Funcionalidades
- Registro de gerente
- Registro de funcionário
- Busca de funcionários
- Busca de dados de funcionário
- Registro de tarefas
- Registro de tarefas realizadas pelo funcionário

## Autenticação
- Gerentes: acesso total, necessário login para uso das funcionalidades.
- Funcionários: acesso apenas à consulta de progresso, necessário login.
- Autenticação via JWT, implementada como middleware.

## Estrutura do Projeto
- `routes/`: Rotas da API
- `controllers/`: Lógica dos endpoints
- `service/`: Regras de negócio
- `model/`: Modelos de dados
- `resources/`: Documentação Swagger

## Documentação
A documentação da API está disponível em `/api-docs` após iniciar o servidor.

## Execução
1. Instale as dependências:
   ```powershell
   npm install
   ```
2. Inicie o servidor:
   ```powershell
   node src/index.js
   ```

## Banco de Dados
- Utiliza banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Tecnologias
- Node.js
- Express
- JWT
- Swagger
