// Modelos de dados para gerente, funcionario, tarefa e progresso
class Gerente {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = 'gerente';
  }
}

class Funcionario {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = 'funcionario';
    this.tarefasRealizadas = [];
    this.tarefasAtribuidas = [];
  }
}

class Tarefa {
  constructor(id, titulo, descricao) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
  }
}

module.exports = { Gerente, Funcionario, Tarefa };
