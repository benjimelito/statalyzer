import React from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import SingleMatchup from './SingleMatchup.jsx'

class Matchups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchups : null
    };
  }

  componentDidMount() {
    const base_url = 'https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/game-lines.sbk'
    axios.post('/scrapeToday', { url: base_url})
    .then((response) => {
      this.setState({
        matchups : response.data
      })
      console.log(this.state)
    })
  }

  render() {
    if(this.state.matchups){
    return (
      <MatchupsList matchups={this.state.matchups}/>
    );
  }
  return (<Grid></Grid>)
  }
}

let MatchupsList = (props) => (
  <Grid>
    {props.matchups.map(function(game, i){
      return <SingleMatchup home={game.Home} away={game.Away} time={game.Time} homeSpread={game['Home Spread']} homeLine={game['Home Line']} awayLine={game['Away Line']} awaySpread={game['Away Spread']} over={game.Over} under={game.Under} index={i}/>
    })}
  </Grid>
)

export default Matchups;