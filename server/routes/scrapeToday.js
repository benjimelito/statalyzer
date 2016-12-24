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
    	let json = { Home : "", Away : "", 'Home Spread': "", 'Away Spread': "", Time: "", 'Home Line': "", 'Away Line': ""}
    	json.Time = $(this).find('#time').text().split(' ')[0]
    	json['Home Spread'] = $(this).find('.market').eq(1).text()
    	json['Away Spread'] = $(this).find('.eventrow').children().last().find('.market').eq(1).text()
    	json.Home = $(this).find('#firstTeamName').text()
    	json.Away = $(this).find('#secondTeamName').text()
    	json['Away Line'] = $(this).find('.money').eq(1).find('.market').text()
    	json['Home Line'] = $(this).find('.money').eq(0).find('.market').text()
    	logs.push(json)
    })
    console.log(logs)
  })
})

module.exports = router;