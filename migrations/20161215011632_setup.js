
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTable('teams', function(table){
      table.string('name')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('teams')
  ])
};
