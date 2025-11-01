1. Objetivo
Criar uma API Rest para acompanhamento da gestão de funcionarios de uma empresa.

2.Contexto

-A API possui as seguintes funcionalidades: registro de gerente, registro de funcionario, busca de funcionarios, busca de dados de funcionario, registro de tarefas e registro de tarefas já tomadas pelo aluno.
-Para que eu possa usar as funcionalidades, preciso fazer login como gerente.
-Para que o funcionario possa consultar seu progresso, ele precisa fazer login como funcionario.
-funcionarios apenas consultam progresso, gerentes acessam todas as funcionalidades do sistema.
-Progressão é feita através da comparação de tarefas existentes e das tarefas já realizadas pelo funcionario.

3. Regras
-Não me pergunte nada, só faça.
-A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
-Adicione um endpoint para renderizar o Swagger.
-Construa um arquivo README para descrever o projeto
-Divida a API em camadas: routes, controllers, service e model
-Armazene os dados da API em um banco de dados em memória
-Utilize a biblioteca express para construir a API Rest
-Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.
