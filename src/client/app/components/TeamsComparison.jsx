import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

class TeamsComparison extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			home : this.props.location.query.home,
			away: this.props.location.query.away,
			homeStats : null,
			awayStats : null
		}
	}

	componentDidMount() {
		console.log('props: ',this.props)
		console.log(this.state.home, this.state.away)
	}

	render() {
		return (
			<div> 
			  
			  <Row>
			    <Col md={4} className='team'> Team </Col>
			    <Col md={4} className='team'> {this.state.home} </Col>
			    <Col md={4} className='team'> {this.state.away} </Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> ATS Record </Col>
			    <Col md={4} className='team'> {this.state.homeStats.winsATS} '-' {this.state.homeStats.lossesATS}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.winsATS} '-' {this.state.awayStats.lossesATS}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> Straight Up Record </Col>
			    <Col md={4} className='team'> {this.state.homeStats.winsSU} '-' {this.state.homeStats.lossesSU}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.winsATS} '-' {this.state.awayStats.winsSu}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> Points Per Game </Col>
			    <Col md={4} className='team'> {this.state.homeStats.PPG}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.PPG}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> Points Allowed Per Game </Col>
			    <Col md={4} className='team'> {this.state.homeStats.PAPG}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.PAPG}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> 82 Game Pace ATS </Col>
			    <Col md={4} className='team'> {this.state.homeStats.paceWinsATS} '-' {82 - this.state.homeStats.paceWinsATS}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.PAPG} '-' {82 - this.state.awayStats.paceWinsATS}</Col>
			  </Row>

			  <Row>
			    <Col md={4} className='team'> 82 Game Pace SU </Col>
			    <Col md={4} className='team'> {this.state.homeStats.paceWinsSU} '-' {82 - this.state.homeStats.paceWinsSU}</Col>
			    <Col md={4} className='team'> {this.state.awayStats.paceWinsSU} '-' {82 - this.state.awayStats.paceWinsSU}</Col>
			  </Row>

  		</div>
		)
	}
}

export default TeamsComparison;