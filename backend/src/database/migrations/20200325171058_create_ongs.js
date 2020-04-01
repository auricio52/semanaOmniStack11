exports.up = function(knex) { // Cria a tabela
 return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
})  
};

exports.down = function(knex) { // Deleta a tabela caso ocorra algum erro
  return knex.schema.dropTable('ongs')
};
