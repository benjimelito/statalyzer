const helpers = require('../routes/serverHelpers.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  insertStatsOnDate : (req, res, next) => {
    helpers.getGamesForTeam(req.body.team)
    .then(function(teamResponse){
      const objectsToInsert = [];

      teamResponse.reduce((totalStatsObj, gameObj) => {
        let statsOnDateObj = {};
        statsOnDateObj[gameObj.date] = totalStatsObj;
        objectsToInsert.push(statsOnDateObj);

        //TODO: Logic for how the totalStatsObj should be updated on each go around
      },{
        winsATS: 0,
        lossesATS: 0,
        winsSU: 0,
        lossesSU: 0,
        paceWinsSU: null,
        paceWinsATS: null,
        PPG: null,
        PAPG: null,
        plusMinusATSPG: null,
        oversToDate: 0,
        undersToDate: 0,
        homeWinsATS: 0,
        homeLossesATS: 0,
        awayWinsATS: 0,
        awayLossesATS: 0,
        homeWinsSU: 0,
        awayWinsSU: 0,
        homeLossesSU: 0,
        awayLossesSU: 0,
        favoriteWinsSU: 0,
        favoriteLossesSU: 0,
        underdogWinsSU: 0,
        underdogLossesSU: 0,
        favoriteWinsATS: 0,
        favoriteLossesATS: 0,
        underdogWinsATS: 0,
        underdogLossesATS: 0,
        underdogHomeWinsSU: 0,
        underdogAwayWinsSU: 0,
        favoriteHomeWinsSU: 0,
        favoriteAwayWinsSU: 0,
        underdogHomeLossesSU: 0,
        underdogAwayLossesSU: 0,
        favoriteHomeLossesSU: 0,
        favoriteAwayLossesSU: 0,
        underdogHomeWinsATS: 0,
        underdogAwayWinsATS: 0,
        favoriteHomeWinsATS: 0,
        favoriteAwayWinsATS: 0,
        underdogHomeLossesATS: 0,
        underdogAwayLossesATS: 0,
        favoriteHomeLossesATS: 0,
        favoriteAwayLossesATS: 0
      })
    })
  }
}

