var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'server/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
  	loaders : [
      {test: /\.json$/, loader: 'json'}, //This is necessary in order to use the cheerio module
      {test: /\.jsx?/, loader: 'babel', include: APP_DIR}
  	]
  }
};


module.exports = config;