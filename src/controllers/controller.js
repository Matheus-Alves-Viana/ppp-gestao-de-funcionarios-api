const service = require('../service/service');

// Gerente
exports.registrarGerente = (req, res) => {
  try {
    const gerente = service.registrarGerente(req.body);
    res.status(201).json(gerente);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.loginGerente = (req, res) => {
  try {
    const token = service.autenticarGerente(req.body);
    res.json(token);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

// Funcionario
exports.registrarFuncionario = (req, res) => {
  try {
    const funcionario = service.registrarFuncionario(req.body);
    res.status(201).json(funcionario);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.loginFuncionario = (req, res) => {
  try {
    const token = service.autenticarFuncionario(req.body);
    res.json(token);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

exports.editarFuncionario = (req, res) => {
  try {
    const funcionario = service.editarFuncionario(parseInt(req.params.id), req.body);
    res.json(funcionario);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.excluirFuncionario = (req, res) => {
  try {
    service.excluirFuncionario(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.buscarFuncionarios = (req, res) => {
  res.json(service.listarFuncionarios());
};

exports.buscarFuncionario = (req, res) => {
  const id = parseInt(req.params.id);
  const funcionario = service.progressoFuncionario(id);
  if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
  res.json(funcionario);
};

// Tarefas
exports.registrarTarefa = (req, res) => {
  try {
    if (!req.body.funcionarioId) {
      return res.status(400).json({ message: 'funcionarioId é obrigatório' });
    }
    const tarefa = service.registrarTarefa(req.body);
    res.status(201).json(tarefa);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.editarTarefa = (req, res) => {
  try {
    const tarefa = service.editarTarefa(parseInt(req.params.id), req.body);
    res.json(tarefa);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.excluirTarefa = (req, res) => {
  try {
    service.excluirTarefa(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.registrarTarefaRealizada = (req, res) => {
  try {
    const funcionarioId = req.user.id;
    const { tarefaId } = req.body;
    const funcionario = service.registrarTarefaRealizada(funcionarioId, tarefaId);
    res.json(funcionario);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.progressoFuncionario = (req, res) => {
  try {
    const funcionarioId = req.user.id;
    const progresso = service.progressoFuncionario(funcionarioId);
    res.json(progresso);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
