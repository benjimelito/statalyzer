import React from 'react'
import axios from 'axios'
import { Grid } from 'react-bootstrap'
import SingleMatchup from './SingleMatchup.jsx'
import TeamsComparison from './TeamsComparison.jsx'
import gameLogs from '../gameLogs.js'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const MatchupsList = (props) => (
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
      matchups : null,
      home: 'Home Team',
      away: 'Away Team',
      homeStats: null,
      awayStats: null
    };
  }

  handleClick(index){

    //Removing the name of the team, only keeping the city
    //Special cases for LA Lakers, LA Clippers, and Portland Trail Blazers
    function formatTeam(teamName){
      if(teamName === 'Portland Trail Blazers'){
        let arr = teamName.split(' ')
        arr.pop()
        arr.pop()
        return arr[0]
      } else if (teamName === 'Los Angeles Lakers') {
        return 'LA Lakers'
      } else if (teamName === 'Los Angeles Clippers'){
        return 'LA Clippers'
      } else {
        let arr = teamName.split(' ')
        arr.pop()
        return arr.join(' ') 
      }
    }

    let homeTeam = formatTeam(this.state.matchups[index].Home)
    let awayTeam = formatTeam(this.state.matchups[index].Away)

    browserHistory.push('/matchup?home=' + homeTeam + '&away=' + awayTeam); 

  }

  componentDidMount() {
    console.log(this.props.location)
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
      <div>
        <MatchupsList matchups={this.state.matchups} click={this.handleClick.bind(this)}/>
      </div>
    );
  }
  return (<Grid></Grid>)
  }
}

export default Matchups;