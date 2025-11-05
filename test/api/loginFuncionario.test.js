const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postLogin.json');
const { registrarFuncionario } = require('../helpers/registrarFuncionario');


describe('Login de Funcionario', () => {
    describe('POST /funcionario/login', () => {
        const bodyLogin = { ...postLogin };

        let token
        beforeEach(async () => {

            token = await registrarFuncionario(bodyLogin);
        })


        it('deve retornar 200 com um token em string quando usar credenciais validas ', async () => {

            bodyLogin.email = 'testeLoginFuncionario@funcionario.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })
        it('deve retornar 401 quando tentar acessar sem inserir a senha', async () => {

            bodyLogin.senha = '';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com senha incorreta', async () => {

            bodyLogin.senha = '654321';
            bodyLogin.email = 'testeLoginFuncionario@funcionario.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com email não cadastrado', async () => {

            bodyLogin.email = 'naocadastrado@email.com';
            bodyLogin.senha = '123456';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar sem inserir o email', async () => {

            bodyLogin.email = '';
            bodyLogin.senha = '123456';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com conta de gerente', async () => {
            const bodyLoginGerente = { ...postLogin };

            const respostaLoginGerente = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLoginGerente)
            expect(respostaLoginGerente.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com conta de funcionario desativado', async () => {
        })
    })
})

