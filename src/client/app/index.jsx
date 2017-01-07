import React from 'react';
import {render} from 'react-dom';
import Matchups from './Matchups.jsx';
import {Jumbotron} from 'react-bootstrap';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import gameLogs from './gameLogs'

class App extends React.Component {
  
  componentDidMount() {
    for(var url in gameLogs) {
      let base_url = gameLogs[url];
      console.log(base_url)
      axios.post('/scrape', { url: base_url})
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
