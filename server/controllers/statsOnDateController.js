const helpers = require('../routes/serverHelpers.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  insertStatsOnDate : (req, res, next) => {
    helpers.getGamesForTeam(req.body.team)
    .then(function(teamResponse){
      //Sorting, because games from the DB aren't returned in order
      teamResponse.sort(function(a,b){
        return a.gameNumber - b.gameNumber
      })
      const objectsToInsert = [];

      teamResponse.reduce(function(totalStatsObj, gameObj){
        //Collecting an object of dates, with values of statsOnDate objects to be inserted.
        //This will later be compared to dates that have already been inserted.
        
        let newObj = Object.assign({},totalStatsObj); //Making a copy of stats object from last tick, so that we can update it without affecting all previous totalStatsObj
        totalStatsObj.date = gameObj.date; //Need to change totalStatsObj directly here so that we're not one day behind in the date
        totalStatsObj.team = req.body.team;
        objectsToInsert.push(totalStatsObj);

        //Here we are updating the newObj based on the current gameObj...Hold on to your hats boys, this is gonna get messy
        newObj.date = gameObj.date;
        //winsATS and lossesATS
        gameObj.ATS === 'W' ? newObj.winsATS ++ : newObj.lossesATS ++;

        //winsSU and lossesSU
        gameObj.result === 'W' ? newObj.winsSU ++ : newObj.lossesSU ++;
        //Create total games played variable here after updating this
        let totalGamesPlayed = newObj.winsSU + newObj.lossesSU || 1;

        //totalPoints and totalPointsAllowed
        newObj.totalPoints = newObj.totalPoints + gameObj.teamScore;
        newObj.totalPointsAllowed = newObj.totalPointsAllowed + gameObj.oppScore;
        
        //paceWinsSU and paceWinsATS
        newObj.paceWinsSU = newObj.winsSU / totalGamesPlayed * 82;
        newObj.paceWinsATS = newObj.winsATS / totalGamesPlayed * 82;

        //PPG and PAPG
        newObj.PPG = newObj.totalPoints / totalGamesPlayed;
        newObj.PAPG = newObj.totalPointsAllowed / totalGamesPlayed;

        //plusMinusATSPG and totalPlusMinusATS
        newObj.totalPlusMinusATS = newObj.totalPlusMinusATS + (gameObj.teamScore - gameObj.oppScore + gameObj.spread);
        newObj.plusMinusATSPG = newObj.totalPlusMinusATS / totalGamesPlayed;

        //oversToDate and undersToDate
        if(gameObj.OU === 'U'){
            newObj.undersToDate ++;
        }
        if(gameObj.OU === 'O'){
            newObj.oversToDate ++;
        }

        //ATS x Home/Away
        if(gameObj.location === 'Home'){
            if(gameObj.ATS === 'W'){
                newObj.homeWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                newObj.homeLossesATS ++;
            }
        } else {
            if(gameObj.ATS === 'W'){
                newObj.awayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                newObj.awayLossesATS ++;
            }
        }

        //SU x Home/Away
        if(gameObj.location === 'Home'){
            if(gameObj.result === 'W'){
                newObj.homeWinsSU ++;
            }
            if(gameObj.result === 'L'){
                newObj.homeLossesSU ++;
            }
        } else {
            if(gameObj.result === 'W'){
                newObj.awayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                newObj.awayLossesSU ++;
            }
        }

        //SU x Favorite/Underdog and SU x Favorite/Underdog x Home/Away
        if(gameObj.spread){
            if(gameObj.result === 'W'){
                newObj.underdogWinsSU ++;
                gameObj.location === 'Home' ? newObj.underdogHomeWinsSU ++ : newObj.underdogAwayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                newObj.underdogLossesSU ++;
                gameObj.location === 'Home' ? newObj.underdogHomeLossesSU ++ : newObj.underdogAwayLossesSU ++;
            }
        } else {
            if(gameObj.result === 'W'){
                newObj.favoriteWinsSU ++;
                gameObj.location === 'Home' ? newObj.favoriteHomeWinsSU ++ : newObj.favoriteAwayWinsSU ++;
            }
            if(gameObj.result === 'L'){
                newObj.favoriteLossesSU ++;
                gameObj.location === 'Home' ? newObj.favoriteHomeLossesSU ++ : newObj.favoriteAwayLossesSU ++;
            }
        }

        //ATS x Favorite/Underdog and ATS x Favorite/Underdog x Home/Away
        if(gameObj.spread){
            if(gameObj.ATS === 'W'){
                newObj.underdogWinsATS ++;
                gameObj.location === 'Home' ? newObj.underdogHomeWinsATS ++ : newObj.underdogAwayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                newObj.underdogLossesATS ++;
                gameObj.location === 'Home' ? newObj.underdogHomeLossesATS ++ : newObj.underdogAwayLossesATS ++;
            }
        } else {
            if(gameObj.ATS === 'W'){
                newObj.favoriteWinsATS ++;
                gameObj.location === 'Home' ? newObj.favoriteHomeWinsATS ++ : newObj.favoriteAwayWinsATS ++;
            }
            if(gameObj.ATS === 'L'){
                newObj.favoriteLossesATS ++;
                gameObj.location === 'Home' ? newObj.favoriteHomeLossesATS ++ : newObj.favoriteAwayLossesATS ++;
            }
          }

          return newObj

      },{
        date: null,
        team: null,
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
      console.log(objectsToInsert.slice(0,3)) // Just a sampling
      helpers.getStatsForTeam(req.body.team)
      .then(function(statsResponse){
        console.log('Found ' + statsResponse.length + ' stats objects already inserted for ' + req.body.team)
        let statsInDB = {}; //Used to hold every stats object already in the database

        statsResponse.forEach(function(stat){
          statsInDB[stat.date] = true
        });

        let newStats = objectsToInsert.filter((stat) => (statsInDB[stat.date] !== true)); //Filtering out games that have 
        //already been inserted

        newStats.forEach(function(statsObj){ //Insert stat objects
            helpers.insertStats(statsObj)
            .then(function(res){
              console.log(res)
            })
        })
      })
    })
  },
  getStatsOnDate : (req,res,next) => {
    helpers.getStatsForTeam(req.query.team)
    .then(function(statsResponse){
        let sortedStats = statsResponse.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        })
        res.send(sortedStats.pop())
    })
  }
}
