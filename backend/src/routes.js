//Armazena as rotas da aplicação.
const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

//Desacoplando o moodule de rotas em uma varável.
const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//É preciso fazer a validação antes da criação, portanto o celebrate vem antes.
routes.post("/ongs", celebrate({
    //É possivel validar parâemtros que vem dos diferentes tipos de parâmetros(querys, route, body)
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp : Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/ongs', OngController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().max(50).required(),
        description: Joi.string().max(250).min(30).required(),
        value: Joi.number().positive().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:{
        id: Joi.number().required()
    },
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        //As keys que deve ser validadas devem vir dentro de object nestes casos
        //pois toda requisição http envia muitos headers, "desconhecidos".
        //Propriedades do headers que o desenvolvedor não sabe e não são necessárias validar.
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

routes.post('/sessions', celebrate({
    [Segments.BODY]: {
        id: Joi.string().required()
    }
}), SessionController.create);

//Disponibilizar as routes para a aplicação (index.js, etc).
module.exports = routes; //Exporta a variável;