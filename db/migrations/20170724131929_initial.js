exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('title').unique();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('clues', (table) => {
      table.increments('id').primary();
      table.string('question', 1000);
      table.string('answer', 1000);
      table.integer('value');
      table.integer('categories_id').unsigned();
      table.foreign('categories_id').references('categories.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTable('clues'),
    knex.schema.dropTable('categories')
  ])
};
