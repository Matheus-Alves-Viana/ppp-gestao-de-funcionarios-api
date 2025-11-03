const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postLogin.json');

describe('Cadastro de Gerente', () => {
    describe('POST /gerente/login', () => {
        it('deve retornar 200 com um token em string quando usar credenciais validas ', async () => {

            const bodyLogin = { ...postLogin };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('deve retornar 401 quando tentar acessar sem inserir a senha', async () => {

            const bodyLogin = { ...postLogin };
            bodyLogin.senha = '';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com senha incorreta', async () => { 

            const bodyLogin = { ...postLogin };
            bodyLogin.senha = '654321';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com email não cadastrado', async () => { 

            const bodyLogin = { ...postLogin };
            bodyLogin.email = 'naocadastrado@teste.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar sem inserir o email', async () => { 

            const bodyLogin = { ...postLogin };
            bodyLogin.email = '';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
                
            expect(resposta.status).to.equal(401);
        })

    })
})
