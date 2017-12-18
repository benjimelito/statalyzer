import React from 'react';
import {render} from 'react-dom';
import Matchups from './Matchups.jsx';
import Matchup from './TeamsComparison.jsx'
import {Jumbotron} from 'react-bootstrap';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import gameLogs from '../gameLogs.js'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'; //All pieces of the router object

class App extends React.Component {
  
  // componentDidMount() {
  //   for(var team in gameLogs) {
  //     let teamToUpdate = team
  //     axios.post('/stats', {team: teamToUpdate})
  //   }
  // }

  render () {
    return (
        <div>
          <NavBar />
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>This is a simple hero unit</p>
          </Jumbotron>
          <Router history={browserHistory}>
            <Route exact path="/" component={Matchups} />
            <Route path="/matchup" component={Matchup} />
          </Router>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
