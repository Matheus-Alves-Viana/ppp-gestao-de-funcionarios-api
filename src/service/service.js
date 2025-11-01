const db = require('../model/db');
const { Gerente, Funcionario, Tarefa } = require('../model/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'segredo_super_secreto';

// Gerente
function registrarGerente({ nome, email, senha }) {
  if (db.gerentes.find(g => g.email === email)) throw new Error('Email já cadastrado');
  const hash = bcrypt.hashSync(senha, 8);
  const gerente = new Gerente(db.gerentes.length + 1, nome, email, hash);
  db.gerentes.push(gerente);
  return gerente;
}

function autenticarGerente({ email, senha }) {
  const gerente = db.gerentes.find(g => g.email === email);
  if (!gerente || !bcrypt.compareSync(senha, gerente.senha)) throw new Error('Credenciais inválidas');
  const token = jwt.sign({ id: gerente.id, role: gerente.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

// Funcionario
function registrarFuncionario({ nome, email, senha }) {
  if (db.funcionarios.find(f => f.email === email)) throw new Error('Email já cadastrado');
  const hash = bcrypt.hashSync(senha, 8);
  const funcionario = new Funcionario(db.funcionarios.length + 1, nome, email, hash);
  db.funcionarios.push(funcionario);
  return funcionario;
}

function autenticarFuncionario({ email, senha }) {
  const funcionario = db.funcionarios.find(f => f.email === email);
  if (!funcionario || !bcrypt.compareSync(senha, funcionario.senha)) throw new Error('Credenciais inválidas');
  const token = jwt.sign({ id: funcionario.id, role: funcionario.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

function editarFuncionario(id, dados) {
  const funcionario = db.funcionarios.find(f => f.id === id);
  if (!funcionario) throw new Error('Funcionário não encontrado');
  Object.assign(funcionario, dados);
  return funcionario;
}

function excluirFuncionario(id) {
  const idx = db.funcionarios.findIndex(f => f.id === id);
  if (idx === -1) throw new Error('Funcionário não encontrado');
  db.funcionarios.splice(idx, 1);
}

function listarFuncionarios() {
  return db.funcionarios;
}

// Tarefas
function registrarTarefa({ titulo, descricao, funcionarioId }) {
  const tarefa = new Tarefa(db.tarefas.length + 1, titulo, descricao);
  db.tarefas.push(tarefa);
  // Atribuir ao funcionário
  if (funcionarioId) {
    const funcionario = db.funcionarios.find(f => f.id === funcionarioId);
    if (!funcionario) throw new Error('Funcionário não encontrado');
    if (!funcionario.tarefasAtribuidas) funcionario.tarefasAtribuidas = [];
    funcionario.tarefasAtribuidas.push(tarefa.id);
  }
  return tarefa;
}

function listarTarefas() {
  return db.tarefas;
}

function editarTarefa(id, dados) {
  const tarefa = db.tarefas.find(t => t.id === id);
  if (!tarefa) throw new Error('Tarefa não encontrada');
  Object.assign(tarefa, dados);
  return tarefa;
}

function excluirTarefa(id) {
  const idx = db.tarefas.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Tarefa não encontrada');
  db.tarefas.splice(idx, 1);
}

// Funcionario - progresso
function registrarTarefaRealizada(funcionarioId, tarefaId) {
  const funcionario = db.funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) throw new Error('Funcionário não encontrado');
  if (!db.tarefas.find(t => t.id === tarefaId)) throw new Error('Tarefa não encontrada');
  if (!funcionario.tarefasRealizadas.includes(tarefaId)) funcionario.tarefasRealizadas.push(tarefaId);
  return funcionario;
}

function progressoFuncionario(funcionarioId) {
  const funcionario = db.funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) throw new Error('Funcionário não encontrado');
  const total = db.tarefas.length;
  const realizadas = funcionario.tarefasRealizadas.length;
  return {
    totalTarefas: total,
    tarefasRealizadas: realizadas,
    progresso: total ? realizadas / total : 0,
    tarefas: db.tarefas.map(t => ({ ...t, realizada: funcionario.tarefasRealizadas.includes(t.id) })),
  };
}

module.exports = {
  registrarGerente,
  autenticarGerente,
  registrarFuncionario,
  autenticarFuncionario,
  editarFuncionario,
  excluirFuncionario,
  listarFuncionarios,
  registrarTarefa,
  listarTarefas,
  editarTarefa,
  excluirTarefa,
  registrarTarefaRealizada,
  progressoFuncionario,
  JWT_SECRET,
};
