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
  .insert({date: gameObj.date, 
    gameNumber: gameObj.gameNumber, 
    team: gameObj.team, 
    opponent: gameObj.opponent, 
    game: gameObj.game, 
    result: gameObj.result, 
    location: gameObj.location, 
    ATS: gameObj.ATS, 
    spread: gameObj.spread, 
    OU: gameObj.OU, 
    total: gameObj.total, 
    teamScore: gameObj.teamScore, 
    oppScore: gameObj.oppScore})
}

exports.insertStats = function(statsObj){
  return knex('stats_on_date')
  .returning('id')
  .insert({
    date: statsObj.date,
    winsATS: statsObj.winsATS,
    lossesATS: statsObj.lossesATS,
    winsSU: statsObj.winsSU,
    lossesSU: statsObj.lossesSU,
    totalPoints: statsObj.totalPoints,
    totalPointsAllowed: statsObj.totalPointsAllowed,
    paceWinsSU: statsObj.paceWinsSU,
    paceWinsATS: statsObj.paceWinsATS,
    PPG: statsObj.PPG,
    PAPG: statsObj.PAPG,
    plusMinusATSPG: statsObj.plusMinusATSPG,
    totalPlusMinusATS: statsObj.totalPlusMinusATS,
    oversToDate: statsObj.oversToDate,
    undersToDate: statsObj.undersToDate,
    homeWinsATS: statsObj.homeWinsATS,
    homeLossesATS: statsObj.homeLossesATS,
    awayWinsATS: statsObj.awayWinsATS,
    awayLossesATS: statsObj.awayLossesATS,
    homeWinsSU: statsObj.homeWinsSU,
    awayWinsSU: statsObj.awayWinsSU,
    homeLossesSU: statsObj.homeLossesSU,
    awayLossesSU: statsObj.awayLossesSU,
    favoriteWinsSU: statsObj.favoriteWinsSU,
    favoriteLossesSU: statsObj.favoriteLossesSU,
    underdogWinsSU: statsObj.underdogWinsSU,
    underdogLossesSU: statsObj.underdogLossesSU,
    favoriteWinsATS: statsObj.favoriteWinsATS,
    favoriteLossesATS: statsObj.favoriteLossesATS,
    underdogWinsATS: statsObj.underdogWinsATS,
    underdogLossesATS: statsObj.underdogLossesATS,
    underdogHomeWinsSU: statsObj.underdogHomeWinsSU,
    underdogAwayWinsSU: statsObj.underdogAwayWinsSU,
    favoriteHomeWinsSU: statsObj.favoriteHomeWinsSU,
    favoriteAwayWinsSU: statsObj.favoriteAwayWinsSU,
    underdogHomeLossesSU: statsObj.underdogHomeLossesSU,
    underdogAwayLossesSU: statsObj.underdogAwayLossesSU,
    favoriteHomeLossesSU: statsObj.favoriteHomeLossesSU,
    favoriteAwayLossesSU: statsObj.favoriteAwayLossesSU,
    underdogHomeWinsATS: statsObj.underdogHomeWinsATS,
    underdogAwayWinsATS: statsObj.underdogAwayWinsATS,
    favoriteHomeWinsATS: statsObj.favoriteHomeWinsATS,
    favoriteAwayWinsATS: statsObj.favoriteAwayWinsATS,
    underdogHomeLossesATS: statsObj.underdogHomeLossesATS,
    underdogAwayLossesATS: statsObj.underdogAwayLossesATS,
    favoriteHomeLossesATS: statsObj.favoriteHomeLossesATS,
    favoriteAwayLossesATS: statsObj.favoriteAwayLossesATS
  })
}