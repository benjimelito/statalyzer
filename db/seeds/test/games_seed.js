
exports.seed = function(knex, Promise) {
  return knex('games').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('games').insert({
        date: '01-01-2017',
        gameNumber: 1,
        team: 'Boston',
        opponent: 'New York',
        game: 'REG',
        result: 'W',
        location: 'Home',
        ATS: 'W',
        spread: -3,
        OU: 184,
        total: 185,
        teamScore: 100,
        oppScore: 85
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-01-2017',
        gameNumber: 1,
        team: 'New York',
        opponent: 'Boston',
        game: 'REG',
        result: 'L',
        location: 'Away',
        ATS: 'L',
        spread: 3,
        OU: 184,
        total: 185,
        teamScore: 85,
        oppScore: 100
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-03-2017',
        gameNumber: 2,
        team: 'Boston',
        opponent: 'New York',
        game: 'REG',
        result: 'W',
        location: 'Away',
        ATS: 'W',
        spread: -1,
        OU: 190,
        total: 188,
        teamScore: 98,
        oppScore: 90
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-03-2017',
        gameNumber: 2,
        team: 'New York',
        opponent: 'Boston',
        game: 'REG',
        result: 'L',
        location: 'Home',
        ATS: 'L',
        spread: 1,
        OU: 190,
        total: 188,
        teamScore: 90,
        oppScore: 98
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-01-2017',
        gameNumber: 1,
        team: 'Golden State',
        opponent: 'San Antonio',
        game: 'REG',
        result: 'W',
        location: 'Home',
        ATS: 'L',
        spread: -8,
        OU: 200,
        total: 210,
        teamScore: 108,
        oppScore: 102
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-01-2017',
        gameNumber: 1,
        team: 'Golden State',
        opponent: 'San Antonio',
        game: 'REG',
        result: 'W',
        location: 'Home',
        ATS: 'L',
        spread: -8,
        OU: 200,
        total: 210,
        teamScore: 108,
        oppScore: 102
      });
    }).then(function () {
      return knex('games').insert({
        date: '01-01-2017',
        gameNumber: 1,
        team: 'San Antonio',
        opponent: 'Golden State',
        game: 'REG',
        result: 'L',
        location: 'Away',
        ATS: 'W',
        spread: 8,
        OU: 200,
        total: 210,
        teamScore: 102,
        oppScore: 108
      });
    });
};