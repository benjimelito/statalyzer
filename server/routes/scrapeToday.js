const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/scrapeToday', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
  	let logs = []
    let $ = cheerio.load(response.data)
    $('.eventbox').each(function(index){
    	let json = { Home : "", Away : "", 'Home Spread': "", 'Away Spread': "", Time: "", 'Home Line': "", 'Away Line': "", Over: "", Under: ""}
    	json.Time = $(this).find('#time').text().split(' ')[0]
    	json['Away Spread'] = $(this).find('.market').eq(1).text()
    	json['Home Spread'] = $(this).find('.market').eq(4).text()
    	json.Away = $(this).find('#firstTeamName').text()
    	json.Home = $(this).find('#secondTeamName').text()
    	json.Over = $(this).find('.market').eq(0).text()
    	json.Under = $(this).find('.market').eq(3).text()
      json['Away Line'] = $(this).find('.market').eq(2).text()
      json['Home Line'] = $(this).find('.market').eq(5).text()
    	logs.push(json)
    })
    res.send(logs)
  })
})

module.exports = router;