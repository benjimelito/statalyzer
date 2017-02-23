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
  .insert({date: gameObj.Date, gameNumber: gameObj.GameNumber, team: gameObj.Team, opponent: gameObj.Opponent, game: gameObj.Game, result: gameObj.Result, location: gameObj.Location, ATS: gameObj.ATS, spread: gameObj.Spread, OU: gameObj.OU, total: gameObj.Total, teamScore: gameObj.teamScore, oppScore: gameObj.oppScore})
}