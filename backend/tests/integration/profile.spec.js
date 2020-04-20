const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG Profile', () => {
    beforeAll(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    let recentlyCreatedOngId;
    it('should be able to create an ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD - Profile",
	            email: "contato@email.com",
	            whatsapp: "5514999999",
	            city: "Botucatu",
	            uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        recentlyCreatedOngId = response.body.id;
    });
    
    let incidentsRecentlyCreated = [];
    it('should be able to create two incidents for that recently created ong', async() => {
        const response = await request(app)
        .post('/incidents')
        .set('authorization', recentlyCreatedOngId)
        .send({
            title: "Caso do Tucano do PSDB OK",
            description: "Ele está arrecadando dinheiro para o partido. Ajude-o por favor.",
            value: 10
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toEqual(expect.any(Number));

        incidentsRecentlyCreated.push(response.body.id);
    });
    
    afterAll(async() => {
        await connection.destroy();
    })
})