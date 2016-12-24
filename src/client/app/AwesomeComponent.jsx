import React from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let base_url = 'https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/game-lines.sbk'
    
    axios.post('/scrapeToday', { url: base_url})
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
        </Navbar>
      </div>
    );
  }

}

export default AwesomeComponent;