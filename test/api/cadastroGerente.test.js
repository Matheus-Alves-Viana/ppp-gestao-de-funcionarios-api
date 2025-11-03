const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postCadastro = require('../fixtures/postCadastro.json');

describe('Cadastro de Gerente', () => {
    describe('POST /gerente/registrar', () => {
        it('deve retornar 201 quando registrar um novo gerente com dados válidos', async () => {

            const bodyCadastro = { ...postCadastro };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(201);
        })

        it('deve retornar 400 quando tentar registrar um gerente com email já existente', async () => {

            const bodyCadastro = { ...postCadastro };
            bodyCadastro.nome = 'Matheusv';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 400 quando tentar registrar um gerente com dados de email inválido', async () => {

            const bodyCadastro = { ...postCadastro };
            bodyCadastro.nome = 'Matheusv';
            bodyCadastro.email = 'emailinvalido';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 400 quando tentar registrar um gerente faltando nome', async () => {

            const bodyCadastro = { ...postCadastro };
            bodyCadastro.nome = '';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': '',
                    'email': 'email@valido.com',
                    'senha': '123'
                })
            expect(resposta.status).to.equal(400);
        })
    })
})