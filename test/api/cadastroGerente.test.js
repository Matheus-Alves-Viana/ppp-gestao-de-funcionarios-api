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
                    'nome': 'Matheusd',
                    'email': 'matheus@teste.com',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(201);
        })
    })
})