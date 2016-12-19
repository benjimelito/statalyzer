const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/scrape', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
    var logs = []
    let $ = cheerio.load(response.data)
    $('tr').each(function(i, data){
      let line = [$(data).text()]
      logs.push(line)
    })
    console.log(logs)
  })
})

module.exports = router;
