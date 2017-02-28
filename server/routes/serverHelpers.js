const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'statlyzer_data'
  }
});

exports.getGamesForTeam = function(team){
  return knex('games').where('team', team);
}

exports.insertGame = function(gameObj){
  return knex('games')
  .returning('id')
  .insert({date: gameObj.date, game_number: gameObj.gameNumber, team: gameObj.team, opponent: gameObj.opponent, game: gameObj.game, result: gameObj.result, location: gameObj.location, ATS: gameObj.ATS, spread: gameObj.spread, OU: gameObj.OU, total: gameObj.total, team_score: gameObj.teamScore, opp_score: gameObj.oppScore})
}