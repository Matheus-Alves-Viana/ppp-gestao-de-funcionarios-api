const request = require('supertest');
const { expect } = require('chai');
const postTarefa = require('../fixtures/postTarefa.json');
const { obterToken } = require('../helpers/autenticacao');
const postLogin = require('../fixtures/postLogin.json');
const postLoginFuncionario = require('../fixtures/postLogin.json');
const { obterTokenFuncionario } = require('../helpers/autenticacaoFuncionario');

describe('Gestao de Tarefas', () => {
    const bodyLogin = { ...postLogin };

    let token
    beforeEach(async () => {

        token = await obterToken(bodyLogin);
    })


    describe('POST /tarefa', () => {


        it('deve retornar 201 quando criar uma nova tarefa com dados validos', async () => {
            const bodyTarefa = { ...postTarefa };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/tarefa')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)

            expect(resposta.status).to.equal(201);

        })

        it('deve retornar 400 quando tentar criar uma nova tarefa sem titulo', async () => {
            const bodyTarefa = { ...postTarefa };
            bodyTarefa.titulo = '';
            const resposta = await request(process.env.BASE_URL)
                .post('/api/tarefa')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)
            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 401 quando tentar criar uma nova tarefa sem token de autenticação', async () => {
            const bodyTarefa = { ...postTarefa };
            const resposta = await request(process.env.BASE_URL)
                .post('/api/tarefa')
                .set('Content-Type', 'application/json')
                .send(bodyTarefa)
            expect(resposta.status).to.equal(401);
        })

        it('deve retornar 400 quando tentar criar uma nova tarefa com funcionarioId inexistente', async () => {
            const bodyTarefa = { ...postTarefa };
            bodyTarefa.funcionarioId = 9999;
            const resposta = await request(process.env.BASE_URL)
                .post('/api/tarefa')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)
            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 403 quando tentar criar uma tarefa usando perfil de funcionario', async () => {
            const bodyLoginFuncionario = { ...postLoginFuncionario };

            const token = await obterTokenFuncionario(bodyLoginFuncionario);
            const bodyTarefa = { ...postTarefa };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/tarefa')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)
            expect(resposta.status).to.equal(403);
        })

    })

    describe('PUT /tarefa/{id}', () => {
        it('deve retornar 200 quando atualizar uma tarefa existente com dados validos', async () => {
            const bodyTarefa = { ...postTarefa };
            bodyTarefa.titulo = 'Titulo atualizado';
            const resposta = await request(process.env.BASE_URL)
                .put('/api/tarefa/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)
            expect(resposta.status).to.equal(200);
        })

        it('deve retornar 404 quando tentar atualizar uma tarefa inexistente', async () => {
            const bodyTarefa = { ...postTarefa };
            bodyTarefa.titulo = 'Titulo atualizado';
            const resposta = await request(process.env.BASE_URL)
                .put('/api/tarefa/9999')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTarefa)
            expect(resposta.status).to.equal(404);
        })
    })

    describe('DELETE /tarefa/{id}', () => {
        it('deve retornar 204 ao deletar uma tarefa existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete('/api/tarefa/1')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(204);
        })

        it('deve retornar 404 ao tentar deletar uma tarefa inexistente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete('/api/tarefa/9999')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(404);
        })
    })

})  