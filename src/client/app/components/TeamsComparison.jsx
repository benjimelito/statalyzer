import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import NavBar from './NavBar.jsx';

class TeamComparison extends React.Component {
  
  componentDidMount() {
    // for(var team in gameLogs) {
    //   let teamToUpdate = team
    //   axios.post('/stats', {team: teamToUpdate})
    // }
  }

  render () {
    return (
      <div>
        <NavBar />
         <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple hero unit</p>
        </Jumbotron>
      </div>
    );
  }
}

module.exports = App;