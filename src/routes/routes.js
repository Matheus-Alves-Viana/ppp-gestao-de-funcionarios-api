const express = require('express');
const controller = require('../controllers/controller');
const { autenticarToken, somenteGerente, somenteFuncionario } = require('../middleware/auth');

const router = express.Router();

// Gerente
router.post('/gerente/registrar', controller.registrarGerente);
router.post('/gerente/login', controller.loginGerente);

// Funcionario
router.post('/funcionario/registrar', autenticarToken, somenteGerente, controller.registrarFuncionario);
router.post('/funcionario/login', controller.loginFuncionario);
router.get('/funcionarios', autenticarToken, somenteGerente, controller.buscarFuncionarios);
router.get('/funcionario/:id', autenticarToken, somenteGerente, controller.buscarFuncionario);
router.put('/funcionario/:id', autenticarToken, somenteGerente, controller.editarFuncionario);
router.delete('/funcionario/:id', autenticarToken, somenteGerente, controller.excluirFuncionario);

// Tarefas
router.post('/tarefa', autenticarToken, somenteGerente, controller.registrarTarefa);
router.put('/tarefa/:id', autenticarToken, somenteGerente, controller.editarTarefa);
router.delete('/tarefa/:id', autenticarToken, somenteGerente, controller.excluirTarefa);

// Progresso do funcionario (apenas o próprio funcionario)
router.post('/tarefa/realizada', autenticarToken, somenteFuncionario, controller.registrarTarefaRealizada);
router.get('/progresso', autenticarToken, somenteFuncionario, controller.progressoFuncionario);

module.exports = router;
