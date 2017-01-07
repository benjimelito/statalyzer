const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/scrape', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
    let logs = []
    let $ = cheerio.load(response.data)
      $('tr').each(function(index){
        
        //Setting the inital game object that we will overwrite with data about the game
        let json = { 'Date' : null, Opponent : null, 'Location': null, Game: null, Result: null, teamScore: null, oppScore: null, ATS: null, Spread: null, OU: null, Total: null}
        
        //The score is initially expressed like this: 113-109, with the winner's score always first.
        //We must split the score, then assign the totals appropriately based on the winner
        let splitScore = $(this).find('td').eq(4).text().trim().split('-');
        let scoreOne = splitScore[0];
        let scoreTwo = splitScore[1];
        if (json.Result = $(this).find('td').eq(3).text().trim() === 'W') {
          json.teamScore = scoreOne;
          json.oppScore = scoreTwo;
        } else {
          json.teamScore = scoreTwo;
          json.oppScore = scoreOne;
        }

        //The opponent is originally expressed like this: '@ Toronto' or this: 'vs Orlando'
        json.Opponent = $(this).find('td').eq(1).text().trim()[0] === '@' ? json.Location = 'Away' : json.Location = 'Home'
        

        json.Date = $(this).find('td').eq(0).text().trim()
        json.Opponent = $(this).find('td').eq(1).text().trim().split(' ').slice(2).join(' ') //Getting of the preceding 'vs' or '@'
        json.Game = $(this).find('td').eq(2).text().trim()
        json.Result = $(this).find('td').eq(3).text().trim()
        json.ATS = $(this).find('td').eq(5).text().trim()
        json.Spread = $(this).find('td').eq(6).text().trim()
        json.OU = $(this).find('td').eq(7).text().trim()
        json.Total = $(this).find('td').eq(8).text().trim()
        logs.push(json)
      })
    console.log(logs)
  })
})

module.exports = router;
