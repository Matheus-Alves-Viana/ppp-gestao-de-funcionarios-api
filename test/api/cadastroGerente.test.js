const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/index');

describe('Cadastro de Gerente', () => {
    describe('POST /gerente/registrar', () => {
        it('deve retornar 201 quando registrar um novo gerente com dados válidos', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Matheus',
                    'email': 'matheus@teste.com',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(201);
        })

        it('deve retornar 400 quando tentar registrar um gerente com email já existente', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Matheusv',
                    'email': 'matheus@teste.com',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 400 quando tentar registrar um gerente com dados de email inválido', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/gerente/registrar')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Matheusc',
                    'email': 'emailinvalido',
                    'senha': '123'
                })
            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 400 quando tentar registrar um gerente faltando nome', async () => {
            const resposta = await request('http://localhost:3000')
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