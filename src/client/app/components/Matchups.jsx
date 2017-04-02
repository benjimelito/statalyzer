import React from 'react'
import axios from 'axios'
import { Grid } from 'react-bootstrap'
import SingleMatchup from './SingleMatchup.jsx'
import TeamsComparison from './TeamsComparison.jsx'
import gameLogs from '../gameLogs.js'

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
    let homeTeam = this.state.matchups[index].Home
    let awayTeam = this.state.matchups[index].Away

    axios.post('/scrape', {url: gameLogs[homeTeam], team: homeTeam}) //This may need fixing..
    .then(() => {
      console.log(homeTeam, " updated")
    })

    this.setState({
      home: homeTeam,
      away: awayTeam
    })
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
      <div>
        <MatchupsList matchups={this.state.matchups} click={this.handleClick.bind(this)}/>
        <TeamsComparison home={this.state.home} away={this.state.away} />
      </div>
    );
  }
  return (<Grid></Grid>)
  }
}

export default Matchups;