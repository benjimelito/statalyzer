import React from 'react';
import axios from 'axios';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  componentDidMount() {
    var config = {
      headers: {'Authorization': 'Basic YmVuamltZWxpdG86TWltZXM1NTU='}
    };
    axios.get('https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/daily_game_schedule.json?fordate=20161214', config)
    .then(function(data){
      console.log(data, process.env.config)
    })
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
      </div>
    );
  }

}

export default AwesomeComponent;