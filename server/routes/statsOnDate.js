const express = require('express');
const router = express.Router();
const axios = require('axios');
const stats = require('../controllers/statsOnDateController');

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'statlyzer_data'
  }
});

router.post('/stats', stats.insertStatsOnDate)
router.get('/stats', stats.getStatsOnDate)

module.exports = router;