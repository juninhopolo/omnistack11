//Armazena as rotas da aplicação.
const express = require('express');

//Desacoplando o moodule de rotas em uma varável.
const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post("/ongs", OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

//Disponibilizar as routes para a aplicação (index.js, etc).
module.exports = routes; //Exporta a variável;