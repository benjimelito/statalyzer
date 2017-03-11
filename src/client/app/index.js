/*
  This is the entry point for the front end. Do not rename or move this file without changing the "entry" property inside of webpack.config.js
*/
const React = require('react');
const ReactDOM = require('react-dom');

// React router goodies
import { Router, Route, browserHistory, IndexRoute } from 'react-router'; //All pieces of the router object

const App = require('./components/App');
const Matchups = require('./components/Matchups');
const TeamsComparison = require('./components/TeamsComparison')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path="matchup/:home/:away" component={TeamsComparison}/>
      // <Route path="users/:userid/edit" component={EditPage}/>
      // <Route path="books/:bookid" component={Book} />
    </Route>
  </Router>,
  document.getElementById('app')
);
