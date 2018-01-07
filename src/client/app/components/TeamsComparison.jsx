import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import axios from 'axios';

class TeamsComparison extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			home : this.props.location.query.home,
			away: this.props.location.query.away,
			homeStats : {
				winsATS : 'loading',
				winsSU : 'loading',
				PPG : 'loading',
				PAPG : 'loading',
				paceWinsATS : 'loading',
				paceWinsSU : 'loading'
			},
			awayStats : {
				winsATS : 'loading',
				winsSU : 'loading',
				PPG : 'loading',
				PAPG : 'loading',
				paceWinsATS : 'loading',
				paceWinsSU : 'loading'
			}
		}
	}

	componentDidMount() {
		console.log(this.state.home, this.state.away)
		
		axios.get('/stats?team=' + this.state.home)
		.then((response) => {
			this.setState({
				homeStats : response.data
			})
		})

		axios.get('/stats?team=' + this.state.away)
		.then((response) => {
			this.setState({
				awayStats : response.data
			})
		})
	}

	render() {
		return (
			<div> 
			  
			  <Row>
			    <Col md={4} className='team'> Stat </Col>
			    <Col md={4} className='team'> {this.state.home} </Col>
			    <Col md={4} className='team'> {this.state.away} </Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> ATS Record </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.winsATS}-{this.state.homeStats.lossesATS}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.winsATS}-{this.state.awayStats.lossesATS}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> Straight Up Record </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.winsSU}-{this.state.homeStats.lossesSU}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.winsSU}-{this.state.awayStats.winsSU}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> Points Per Game </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.PPG}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.PPG}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> Points Allowed Per Game </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.PAPG}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.PAPG}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> 82 Game Pace ATS </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.paceWinsATS} '-' {82 - this.state.homeStats.paceWinsATS}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.paceWinsATS} '-' {82 - this.state.awayStats.paceWinsATS}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='stat'> 82 Game Pace SU </Col>
			    <Col md={4} className='stat'> {this.state.homeStats.paceWinsSU} '-' {82 - this.state.homeStats.paceWinsSU}</Col>
			    <Col md={4} className='stat'> {this.state.awayStats.paceWinsSU} '-' {82 - this.state.awayStats.paceWinsSU}</Col>
			  </Row>

  		</div>
		)
	}
}

export default TeamsComparison;