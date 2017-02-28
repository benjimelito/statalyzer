import React from 'react';
import {render} from 'react-dom';
import Matchups from './Matchups.jsx';
import {Jumbotron} from 'react-bootstrap';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import gameLogs from './gameLogs'

class App extends React.Component {
  
  componentDidMount() {
    for(var team in gameLogs) {
      let base_url = gameLogs[team];
      let teamToScrape = team
      axios.post('/scrape', { url: base_url, team: teamToScrape})
    }
  }

  render () {
    return (
    	<div>
        <NavBar />
         <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple hero unit</p>
        </Jumbotron>
        <Matchups />
    	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));
