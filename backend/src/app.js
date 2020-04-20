const express = require('express');
const cors = require('cors');

const routes = require('./routes'); //Importa a variável exportada por routes.js

const {errors} = require('celebrate');

const app = express();

app.use(cors());

//Antes das rotas, informa para a aplicação para trasformar os requests em objetos javascript (json).
app.use(express.json());

//Diz para a aplicação usar as rotas.
app.use(routes);

//Usa os status codes corretos para erros causados por validação;
app.use(errors());

module.exports = app;

//app.listen(3333);

/*Em /backend existe uma dependencia chamada "nodemon"
que reinicia o servidor node toda vez que mudanças são
aplicadas em nosso código. Para iniciar o nodemon foi criado
um comando especial em package.json chamado 'start' que
inicia o nodemon em index.js
*/

/*Rota e recursos;
Get: Buscar informações do backend;

Post: Criar informações no backend;

Put: Alterar informações do backend;

Delete: Deleta informações do backend;
*/

/*Tipos de parâmetros
Query Params: Parâmetros nomeados na rota após o "?" que servem
para filtros e paginação.

Route Params: Parâmetros utilizados para identificar recursos únicos.

Request Body: Corpo da requisição, utilizado para criar e alterar recursos.
*/

/*
Banco de dados : SQLite
Para se comunicar com o banco de dados podemos instalar o driver
do banco de dados e então usar SQL ou podemos usar um queryBuilder(kNex.js)
que abstraí as querys SQL em comandos javascript que depois podem
ser entendidos por qualquer driver SQL uma vez que as querys possuem
pequenas diferenças.
*/