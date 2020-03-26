
//Para cada tabela uma migration
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
        //Chave primária, auto_increment;
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //Relacionamento com a ONG;
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
