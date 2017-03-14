/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// React router goodies
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router'; //All pieces of the router object

const App = require('./components/App.jsx');
const Matchups = require('./components/Matchups.jsx');
const TeamsComparison = require('./components/TeamsComparison.jsx')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path="matchup/:home/:away" component={TeamsComparison}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
