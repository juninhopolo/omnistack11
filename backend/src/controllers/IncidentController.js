const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
        const incidentsList = await connection('incidents').select(['incidents.*', 'ongs.name', 'ongs.city', 'ongs.uf', 'ongs.email', 'ongs.whatsapp']).join('ongs', 'ongs.id', '=', 'incidents.ong_id').limit(5).offset((page - 1) * 5);
        const [incidentsCount] = await connection('incidents').count();

        console.log(incidentsCount);

        response.header('X-Total-Count', incidentsCount['count(*)']);

        return response.json(
            incidentsList
        );
    },
    async create(request, response){
        //ong_id vem da ong que está autenticada no sistema, logado.
        //Vem guardado no header da requisição.
        const ong_id = request.headers.authorization;

        const {title, description, value} = request.body;

        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        });

        return response.json({id});
    },
    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').select('ong_id').where('id', id).first();
        
        if (incident.ong_id !== ong_id){
            return response.status(401).json({error : 'Operation not permitted.'});
        }else{
            await connection('incidents').delete().where('id', id);
            return response.status(204).send();
        }
    }
}