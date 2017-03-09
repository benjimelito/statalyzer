import React from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import SingleMatchup from './SingleMatchup.jsx'

let MatchupsList = (props) => (
  <Grid>
    {props.matchups.map(function(game, i){
      return <SingleMatchup click={props.click} home={game.Home} away={game.Away} time={game.Time} homeSpread={game['Home Spread']} homeLine={game['Home Line']} awayLine={game['Away Line']} awaySpread={game['Away Spread']} over={game.Over} under={game.Under} key={i} index={i}/>
    })}
  </Grid>
)

class Matchups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matchups : null
    };
  }

  handleClick(index){
    console.log(this.state.matchups[index].Home + '-' + this.state.matchups[index].Away)
    //In order to pass this as a URL, we are going to have to remove the spaces in team names
    //and replace them with something else. Also probably join them with a "_" or something.
    //Possible that this is not the best way to do things...
  }

  componentDidMount() {
    const base_url = 'https://www.sportsbook.ag/sbk/sportsbook4/nba-betting/game-lines.sbk'
    axios.post('/scrapeToday', { url: base_url})
    .then((response) => {
      this.setState({
        matchups : response.data
      })
    })
  }

  render() {
    if(this.state.matchups){
    return (
      <MatchupsList matchups={this.state.matchups} click={this.handleClick.bind(this)}/>
    );
  }
  return (<Grid></Grid>)
  }
}

export default Matchups;