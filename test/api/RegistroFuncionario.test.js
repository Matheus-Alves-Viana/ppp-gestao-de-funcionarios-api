const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacao');
const { obterTokenFuncionario } = require('../helpers/autenticacaoFuncionario');
const postLoginFuncionario = require('../fixtures/postLogin.json');
const postCadastroFuncionario = require('../fixtures/postCadastro.json');
const postLogin = require('../fixtures/postLogin.json');

describe('Cadastro de Funcionario', () => {

    const bodyLogin = { ...postLogin };

    let token
    beforeEach(async () => {

        token = await obterToken(bodyLogin);
    })

    describe('POST /funcionario/registrar', () => {


        it('deve retornar 201 com criacao de funcionario com credenciais validas ', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'Jeovana';
            bodyCadastroFuncionario.email = 'jeovana@funcionario.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)

            expect(resposta.status).to.equal(201);

        })

        it('deve retornar 400 quando tentar registrar um funcionario com email já existente', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'Jeovana';
            bodyCadastroFuncionario.email = 'jeovana@funcionario.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)

            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 401 quando tentar registrar um funcionario sem token de autenticação', async () => {
            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'testesemtoken';
            bodyCadastroFuncionario.email = 'testesemtoken@semtoken.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .send(bodyCadastroFuncionario)

            expect(resposta.status).to.equal(401);

        })

        it('deve retornar 400 quando tentar registrar um funcionario com dados de email inválido', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'FuncionarioInvalido';
            bodyCadastroFuncionario.email = 'emailinvalido';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)
            expect(resposta.status).to.equal(400);

        })

        it('deve retornar 400 quando tentar registrar um funcionario faltando nome', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = '';
            bodyCadastroFuncionario.email = 'testesemnome@teste.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)

            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 400 quando tentar registrar um funcionario faltando senha', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'testesemsenha';
            bodyCadastroFuncionario.email = 'testesemsenha@teste.com';
            bodyCadastroFuncionario.senha = '';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)

            expect(resposta.status).to.equal(400);

        })

        it('deve retornar 400 quando tentar registrar um funcionario faltando email', async () => {

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'testesememail';
            bodyCadastroFuncionario.email = '';
            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)
            expect(resposta.status).to.equal(400);
        })

        it('deve retornar 403 quando tentar registrar um funcionario com token de autenticação inválido', async () => {
            const bodyLoginFuncionario = { ...postLoginFuncionario };

            const token = await obterTokenFuncionario(bodyLoginFuncionario);

            const bodyCadastroFuncionario = { ...postCadastroFuncionario };
            bodyCadastroFuncionario.nome = 'testecomtokeninvalido';
            bodyCadastroFuncionario.email = 'testecomtokeninvalido@teste.com';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/funcionario/registrar')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyCadastroFuncionario)
            expect(resposta.status).to.equal(403);


        })
    })
    describe('GET /funcionarios', () => {
        it('deve retornar sucesso com 200 e dados iguais ao registro de funcionarios cadastrados', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/funcionarios')
                .set('Authorization', `Bearer ${token}`)


            expect(resposta.status).to.equal(200);

        })

        it('deve retornar usuario em especifico ao ser pesquisado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/funcionario/1')
                .set('Authorization', `Bearer ${token}`)


            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal(1);
        })

    })

    describe('PUT /funcionario{id}', () => {
        it('deve retornar sucesso com 200 ao atualizar dados do funcionario', async () => {
            const bodyAtualizacao = {
                nome: 'FuncionarioAtualizado',
                email: 'testesemnome@teste.com'

            };
            const resposta = await request(process.env.BASE_URL)
                .put('/api/funcionario/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAtualizacao)
            expect(resposta.status).to.equal(200);
        })

        it('deve retornar 404 ao tentar atualizar funcionario com email inválido', async () => {
            const bodyAtualizacao = {
                nome: 'FuncionarioAtualizado',
                email: 'naocadastrado@email.com'
            };
            const resposta = await request(process.env.BASE_URL)
                .put('/api/funcionario/9999')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAtualizacao)
            expect(resposta.status).to.equal(404);
        });


    })

    describe('DELETE /funcionario{id}', () => {
        it('deve retornar sucesso com 200 ao deletar funcionario', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete('/api/funcionario/1')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(204);
        })

        it('deve retornar 404 ao tentar deletar funcionario inexistente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .delete('/api/funcionario/9999')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(404);
        });
    })


})