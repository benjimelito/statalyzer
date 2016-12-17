const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/scrape', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
  	console.log(response)
  })
})

module.exports = router;
