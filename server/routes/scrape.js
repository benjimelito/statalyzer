const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/scrape', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
    var logs = []
    let $ = cheerio.load(response.data)
      $('tr').each(function(index){
        let json = { 'Date' : "", Opponent : "", Game: "", Result: "", Score: "", ATS: "", Spread: "", OU: "", Total: ""}
        json.Date = $(this).find('td').eq(0).text().trim()
        json.Opponent = $(this).find('td').eq(1).text().trim()
        json.Game = $(this).find('td').eq(2).text().trim()
        json.Result = $(this).find('td').eq(3).text().trim()
        json.Score = $(this).find('td').eq(4).text().trim()
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
