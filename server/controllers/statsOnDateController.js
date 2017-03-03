const helpers = require('../routes/serverHelpers.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  insertStatsOnDate : (req, res, next) => {
    helpers.getGamesForTeam(req.body.team)
    .then(function(teamResponse){
      const objectsToInsert = [];

      teamResponse.reduce(function(totalStatsObj, gameObj){
        //Collecting an object of dates, with values of statsOnDate objects to be inserted.
        //This will later be compared to dates that have already been inserted.
        let statsOnDateObj = {};
        statsOnDateObj[gameObj.date] = totalStatsObj;
        objectsToInsert.push(statsOnDateObj);

        //Here we are updating the totalStatsObj based on the current gameObj...Hold on to your hats boys, this is gonna get messy

        //winsATS and lossesATS
        gameObj.ATS === 'W' ? totalStatsObj.winsATS ++ : totalStatsObj.lossesATS ++;

        //winsSU and lossesSU
        gameObj.result = 'W' ? totalStatsObj.winsSU ++ : totalStatsObj.lossesSU ++;
        //Create total games played variable here after updating this
        let totalGamesPlayed = gameObj.winsSU + gameObj.lossesSU;

        //totalPoints and totalPointsAllowed
        totalStatsObj.totalPoints = totalStatsObj.totalPoints + gameObj.teamScore;
        totalStatsObj.totalPointsAllowed = totalStatsObj.totalPointsAllowed + gameObj.oppScore;
        
        //paceWinsSU and paceWinsATS
        totalStatsObj.paceWinsSU = totalStatsObj.winsSU / totalGamesPlayed * 82;
        totalStatsObj.paceWinsATS = totalStatsObj.winsATS / totalGamesPlayed * 82;

        //PPG and PAPG
        totalStatsObj.PPG = totalStatsObj.totalPoints / totalGamesPlayed;
        totalStatsObj.PAPG = totalStatsObj.totalPointsAllowed / totalGamesPlayed;

        //plusMinusATSPG and totalPlusMinusATS
        totalStatsObj.totalPlusMinusATS = totalStatsObj.totalPlusMinusATS + (gameObj.teamScore - gameObj.oppScore + gameObj.spread);
        totalStatsObj.plusMinusATSPG = totalStatsObj.totalPlusMinusATS / totalGamesPlayed;

        //oversToDate and undersToDate
        if(gameObj.OU === 'U'){
            totalStatsObj.undersToDate ++;
        }
        if(gameObj.OU === 'O'){
            totalStatsObj.oversToDate ++;
        }

        //ATS x Home/Away
        if(gameObj.location === 'Home'){
            if(gameObj.ATS === 'W'){
                totalStatsObj.homeWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                totalStatsObj.homeLossesATS ++;
            }
        } else {
            if(gameObj.ATS === 'W'){
                totalStatsObj.awayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                totalStatsObj.awayLossesATS ++;
            }
        }

        //SU x Home/Away
        if(gameObj.location === 'Home'){
            if(gameObj.result === 'W'){
                totalStatsObj.homeWinsSU ++;
            }
            if(gameObj.result === 'L'){
                totalStatsObj.homeLossesSU ++;
            }
        } else {
            if(gameObj.result === 'W'){
                totalStatsObj.awayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                totalStatsObj.awayLossesSU ++;
            }
        }

        //SU x Favorite/Underdog and SU x Favorite/Underdog x Home/Away
        if(gameObj.spread){
            if(gameObj.result === 'W'){
                totalStatsObj.underdogWinsSU ++;
                gameObj.location === 'Home' ? totalStatsObj.underdogHomeWinsSU ++ : totalStatsObj.underdogAwayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                totalStatsObj.underdogLossesSU ++;
                gameObj.location === 'Home' ? totalStatsObj.underdogHomeLossesSU ++ : totalStatsObj.underdogAwayLossesSU ++;
            }
        } else {
            if(gameObj.result === 'W'){
                totalStatsObj.favoriteWinsSU ++;
                gameObj.location === 'Home' ? totalStatsObj.favoriteHomeWinsSU ++ : totalStatsObj.favoriteAwayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                totalStatsObj.favoriteLossesSU ++;
                gameObj.location === 'Home' ? totalStatsObj.favoriteHomeLossesSU ++ : totalStatsObj.favoriteAwayLossesSU ++;
            }
        }

        //ATS x Favorite/Underdog and ATS x Favorite/Underdog x Home/Away
        if(gameObj.spread){
            if(gameObj.ATS === 'W'){
                totalStatsObj.underdogWinsATS ++;
                gameObj.location === 'Home' ? totalStatsObj.underdogHomeWinsATS ++ : underdogAwayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                totalStatsObj.underdogLossesATS ++;
                gameObj.location === 'Home' ? totalStatObj.underdogHomeLossesATS ++ : underdogAwayLossesATS ++;
            }
        } else {
            if(gameObj.ATS === 'W'){
                totalStatsObj.favoriteWinsATS ++;
                gameObj.location === 'Home' ? totalStatsObj.favoriteHomeWinsATS ++ : totalStatsObj.favoriteAwayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                totalStatsObj.favoriteLossesATS ++;
                gameObj.location === 'Home' ? totalStatsObj.favoriteHomeLossesATS ++ : totalStatsObj.favoriteAwayLossesATS ++;
            }
          }

          return totalStatsObj

      ,{
        winsATS: 0,
        lossesATS: 0,
        winsSU: 0,
        lossesSU: 0,
        totalPoints: 0,
        totalPointsAllowed: 0,
        paceWinsSU: null,
        paceWinsATS: null,
        PPG: null,
        PAPG: null,
        plusMinusATSPG: null,
        totalPlusMinusATS: 0,
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
