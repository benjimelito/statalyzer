
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTableIfNotExists('games', function(table){
      table.increments('id').primary();
      table.string('date');
      table.integer('gameNumber');
      table.string('team');
      table.string('opponent');
      table.string('game');
      table.string('result');
      table.string('location');
      table.string('ATS');
      table.float('spread');
      table.string('OU');
      table.float('total');
      table.integer('teamScore');
      table.integer('oppScore');
    }),
    knex.schema.createTableIfNotExists('stats_on_date', function(table){
      table.increments('id').primary();
      table.string('date');
      table.integer('winsATS');
      table.integer('lossesATS');
      table.integer('winsSU');
      table.integer('lossesSU');
      table.integer('totalPoints');
      table.integer('totalPointsAllowed')
      table.float('paceWinsSU');
      table.float('paceWinsATS');
      table.float('PPG');
      table.float('PAPG');
      table.float('plusMinusATSPG');
      table.integer('totalPlusMinusATS');
      table.integer('oversToDate');
      table.integer('undersToDate');
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
    knex.schema.dropTableIfExists('stats_on_date'),
    knex.schema.dropTableIfExists('games')
  ])
};
