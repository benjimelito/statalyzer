
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.date('date');
      table.integer('gameNumber');
      table.string('team');
      table.string('opponent');
      table.string('game');
      table.string('result');
      table.string('location');
      table.string('ATS');
      table.intger('spread');
      table.integer('OU');
      table.integer('total');
      table.integer('teamScore');
      table.integer('oppScore');
    }),
    knex.schema.createTable('statsOnDate', function(table){
      table.increments('id').primary();
      table.date('date');
      table.integer('winsATS');
      table.integer('lossesATS');
      table.integer('winsSU');
      table.integer('lossesSU');
      table.integer('paceWinsSU');
      table.integer('paceWinsATS');
      table.intger('PPG');
      table.integer('PAPG');
      table.integer('plusMinusATSPG');
      table.integer('homeWinsATS');
      table.integer('homeLossesATS');
      table.integer('awayWinsATS');
      table.integer('awayLossesATS');
      table.integer('homeWinsSU');
      table.integer('awayWinsSU');
      table.integer('homeLossesSU');
      table.integer('awayLossesSU');
      table.integer('favoriteWinsSU');
      table.integer('favoriteLossesSU');
      table.integer('underdogWinsSU');
      table.integer('underdogLossesSU');
      table.integer('favoriteWinsATS');
      table.integer('favoriteLossesATS');
      table.integer('underdogWinsATS');
      table.integer('underdogLossesATS');
      table.integer('underdogHomeWinsSU');
      table.integer('underdogAwayWinsSU');
      table.integer('favoriteHomeWinsSU');
      table.integer('favoriteAwayWinsSU');
      table.integer('underdogHomeLossesSU');
      table.integer('underdogAwayLossesSU');
      table.integer('favoriteHomeLossesSU');
      table.integer('favoriteAwayLossesSU');
      table.integer('underdogHomeWinsATS');
      table.integer('underdogAwayWinsATS');
      table.integer('favoriteHomeWinsATS');
      table.integer('favoriteAwayWinsATS');
      table.integer('underdogHomeLossesATS');
      table.integer('underdogAwayLossesATS');
      table.integer('favoriteHomeLossesATS');
      table.integer('favoriteAwayLossesATS');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('teams'),
    knex.schema.dropTableIfExists('statsOnDate'),
    knex.schema.dropTableIfExists('games')
  ])
};
