const request = require('supertest');
const { obterToken } = require('../helpers/autenticacao');
const postLogin = require('../fixtures/postLogin.json');
const postCadastroFuncionario = require('../fixtures/postCadastro.json');

const registrarFuncionario = async () => {
    const bodyLogin = { ...postLogin };
    const token = await obterToken(bodyLogin);

    const bodyCadastroFuncionario = { ...postCadastroFuncionario };
    bodyCadastroFuncionario.nome = 'testeLoginFuncionario';
    bodyCadastroFuncionario.email = 'testeLoginFuncionario@funcionario.com';

    const resposta = await request(process.env.BASE_URL)
        .post('/api/funcionario/registrar')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyCadastroFuncionario);

    return resposta;
};

module.exports = { registrarFuncionario };
