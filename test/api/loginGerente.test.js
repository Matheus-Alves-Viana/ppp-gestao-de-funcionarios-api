const request = require('supertest');
const { expect } = require('chai');

describe('Cadastro de Gerente', () => {
    describe('POST /gerente/login', () => {
        it('deve retornar 200 com um token em string quando usar credenciais validas ', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'matheus@teste.com',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('deve retornar 401 quando tentar acessar sem inserir a senha', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'matheus@teste.com',
                    'senha': ''
                })
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com senha incorreta', async () => { 
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'matheus@teste.com',
                    'senha': '654321'
                })
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar com email não cadastrado', async () => { 
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'naocadastrado@teste.com',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 401 quando tentar acessar sem inserir o email', async () => { 
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': '',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(401);
        })

    })
})
