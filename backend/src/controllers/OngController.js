const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongsList = await connection('ongs').select('*');
        return response.json({ongsList});
    },
    async create (request, response) {
        //Para query params.
        //const requestQueryParams = request.query;
    
        //Para route params.
        //const requestRouteParams = request.params;
    
        //Para request body, ou seja, criação de recursos.
        const {name, email, whatsapp, city, uf} = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        //Pode demorar....
        await connection('ongs').insert({
            id,
            name, 
            email,
            whatsapp, 
            city, 
            uf
        });
    
        //console.log(name, email, whatsapp, city, uf, id);
    
        return response.json({id});
    }
}