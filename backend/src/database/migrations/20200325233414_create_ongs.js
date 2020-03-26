
//O que fazer ao executar a migrations
exports.up = function(knex) {
    return knex.schema.createTable('ongs', (table) => {
        //Criando a tabela. Ver doc do kNex.
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
};

//Se ocorrer erros durante o up da migration, o que realizar;
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
