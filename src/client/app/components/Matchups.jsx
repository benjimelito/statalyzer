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

    //Removing the name of the team, only keeping the city
    //Special cases for LA Lakers, LA Clippers, and Portland Trail Blazers
    function formatTeamForScrape(teamName){
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

    let homeTeam = formatTeamForScrape(this.state.matchups[index].Home)
    let awayTeam = formatTeamForScrape(this.state.matchups[index].Away)

    console.log('Updating for ', homeTeam, ' and ', awayTeam)

    axios.post('/scrape', {url: gameLogs[homeTeam], team: homeTeam})
    .then(() => {
      console.log(homeTeam, " updated")
    })
    .catch((err) => {
      console.log('Error in post to /scrape: ', err)
    })

    axios.post('/scrape', {url: gameLogs[homeTeam], team: awayTeam})
    .then(() => {
      console.log(awayTeam, " updated")
    })
    .catch((err) => {
      console.log('Error in post to /scrape: ', err)
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