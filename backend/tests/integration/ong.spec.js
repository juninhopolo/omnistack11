//Teste de criação de uma ONG.
//Teste de integração testa a aplicação como um todo, portanto não importaremos o controller
//aqui dentro para testar a criação do banco. Na verdade faremos uma requisição na API criada
//e ela bate no controller que então bate no banco de dados. Ciclo completo.

//Teremos então que possuir uma biblioteca que faz requisiçõs http, porém o 
//axios usado no front não é recomendado para testes.

//Utilizaremos supertest = npm install supertest -D
//-D para indicar uma dependecia de desenvolvimento.

const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG', () => {
    //Antes de tudo teste executar determinada função.
    //Nesse caso zera e sobe o as tabelas para o banco.

    //Tambem teste beforeEach e afterEach que executar antes e depois de cada it();

    beforeAll(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    it('should to create a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name : "APAD - ONg",
	            email: "contato@email.com",
	            whatsapp : "5514999999",
	            city:"Botucatu",
	            uf:"SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to list all ongs created', async() => {
        const response = await request(app).get('/ongs');
        expect(response.body).toHaveProperty('ongsList');

        expect(response.body.ongsList).toHaveLength(1);

        expect(response.body.ongsList[0]).toHaveProperty('id');
        expect(response.body.ongsList[0].id).toHaveLength(8);
    });

    //Executa algo depois de todos os teste.
    //Fecha a conexão com o banco.
    afterAll(async() => {
        await connection.destroy();
    });
});