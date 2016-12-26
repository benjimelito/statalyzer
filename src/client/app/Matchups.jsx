import React from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchups : null
    };
  }

  componentDidMount() {
    let base_url = 'https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/game-lines.sbk'
    axios.post('/scrapeToday', { url: base_url})
    .then((response) => {
      this.setState({
        matchups : response
      })
    })
  }

  render() {
    return (
      <Grid></Grid>
    );
  }

}

export default AwesomeComponent;