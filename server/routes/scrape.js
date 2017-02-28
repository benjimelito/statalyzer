const express = require('express');
const router = express.Router();
const axios = require('axios');
const games = require('../controllers/gamesController');

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'statlyzer_data'
  }
});

router.post('/scrape', games.insertGame)

module.exports = router;
