// Banco de dados em memória
const { Gerente, Funcionario, Tarefa } = require('../model/models');

const db = {
  gerentes: [],
  funcionarios: [],
  tarefas: [],
};

module.exports = db;
