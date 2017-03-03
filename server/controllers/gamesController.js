const helpers = require('../routes/serverHelpers.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  insertGame: (req, res, next) => {
    axios.get(req.body.url)
    .then(function(response){
      let logs = []
      let $ = cheerio.load(response.data)
        $('tr').each(function(index){
          
          //Setting the inital game object that we will overwrite with data about the game
          let json = { date : null, team: null, opponent : null, location: null, game: null, result: null, teamScore: null, oppScore: null, ATS: null, spread: null, OU: null, total: null}
          
          //The score is initially expressed like this: 113-109, with the winner's score always first.
          //We must split the score, then assign the totals appropriately based on the winner
          let splitScore = $(this).find('td').eq(4).text().trim().split('-');
          let scoreOne = splitScore[0] || 0;
          let scoreTwo = splitScore[1] || 0;
          if (json.result = $(this).find('td').eq(3).text().trim() === 'W') {
            json.teamScore = Number(scoreOne);
            json.oppScore = Number(scoreTwo);
          } else {
            json.teamScore = Number(scoreTwo);
            json.oppScore = Number(scoreOne);
          }

          //The opponent is originally expressed like this: '@ Toronto' or this: 'vs Orlando'
          json.opponent = $(this).find('td').eq(1).text().trim()[0] === '@' ? json.location = 'Away' : json.location = 'Home'
          

          json.date = $(this).find('td').eq(0).text().trim() //Note, you can sort these dates by using new Date(date)
          json.gameNumber = index //Argument to the each function
          json.team = req.body.team //Passed in along with the url as part of the POST request
          json.opponent = $(this).find('td').eq(1).text().trim().split(' ').slice(2).join(' ') //Getting of the preceding 'vs' or '@'
          json.game = $(this).find('td').eq(2).text().trim()
          json.result = $(this).find('td').eq(3).text().trim()
          json.ATS = $(this).find('td').eq(5).text().trim()
          json.spread = Number($(this).find('td').eq(6).text().trim()) || 0
          json.OU = $(this).find('td').eq(7).text().trim()
          json.total = Number($(this).find('td').eq(8).text().trim()) || 0
          logs.push(json)
        })
      return logs
    })
    .then(function(logs){
      helpers.getGamesForTeam(req.body.team)
      .then(function(teamResponse){
        console.log('Found ' + teamResponse.length + ' game objects already inserted for ' + req.body.team)
        let gamesInDB = {};

        teamResponse.forEach(function(game){
          if(game.teamScore){
          gamesInDB[game.date] = true
          };
        });

        logs.shift() //Removing undefined object at position 0
        let newGames = logs.filter((game) => (gamesInDB[game.date] !== true));
        
        newGames.forEach(function(gameObj){
          if(gameObj.teamScore){
            helpers.insertGame(gameObj)
            .then(function(res){
              console.log(res)
            })
          }
        })
      })
    }) 
  }
}