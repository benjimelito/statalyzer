const React = require('react');
const axios = require('axios');
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // var base_url = 'http://www.oddsshark.com/stats/gamelog/basketball/nba/20722'
    
    // axios.post('/scrape', { url: base_url})
    
    const date = new Date()
    const dateString = '' + date.getFullYear() + (date.getMonth() +1) + date.getDate()
    
    const config = {
      headers: {'Authorization': 'Basic YmVuamltZWxpdG86TWltZXM1NTU='}
    };
    axios.get('https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/daily_game_schedule.json?fordate=' + dateString, config)
    .then(function(data){
      console.log(data)
    })
  
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