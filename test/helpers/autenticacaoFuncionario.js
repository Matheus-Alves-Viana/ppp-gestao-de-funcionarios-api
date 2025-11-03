const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const obterTokenFuncionario = async () => {
    const bodyLoginFuncionario = { ...postLogin };
    bodyLoginFuncionario.email = 'jeovana@funcionario.com';

    const respostaLoginFuncionario = await request(process.env.BASE_URL)
        .post('/api/gerente/login')
        .set('Content-Type', 'application/json')
        .send(bodyLoginFuncionario)

    return respostaLoginFuncionario.body.token;
}

module.exports = {
    obterTokenFuncionario
}