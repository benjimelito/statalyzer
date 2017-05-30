const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const cluster = require('cluster')
const routes = require('./routes/index.js');
const scrape = require('./routes/scrape.js')
const scrapeToday = require('./routes/scrapeToday.js')
const statsOnDate = require('./routes/statsOnDate.js')
const db = require('./db');

//Setting up clustering. The scraping processes take a lot of time, so let's
//use clusters to speed them up.

//ON SECOND THOUGHT: Clustering seems to cause an issue with the database locking, so we'll have to hold off
//on this for now

//The master cluster sets up all the workers
// if(cluster.isMaster) {
//     var numWorkers = require('os').cpus().length;

//     for(var i = 0; i < numWorkers; i++) {
//         cluster.fork();
//     }

    // cluster.on('online', function(worker) {
    //     console.log('Worker ' + worker.process.pid + ' is online');
    // });

//     cluster.on('exit', function(worker, code, signal) {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker');
//         cluster.fork();
//     });
// } else {
  //Business as usual for the worker clusters
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));


  app.use('/', routes);
  app.use(scrape); //Scrape game results for a given team
  app.use(scrapeToday); //Show today's games
  app.use(statsOnDate); //Create stats on date objects for a given team


  // 404 catcher
  app.use((req, res, next) => {
    let err = new Error(`404: ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(500).send({
      message: err.message,
      error: err
    });
  });

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
  });
//}
module.exports = app;
