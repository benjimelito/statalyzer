
exports.up = function(knex, Promise) {
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users');
  ])
};
