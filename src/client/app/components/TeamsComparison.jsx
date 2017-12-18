import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

class TeamsComparison extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			home : this.props.location.query.home,
			away: this.props.location.query.away
		}
	}

	componentDidMount() {
		console.log(this.state.home, this.state.away)
	}

	render() {
		return (
			<div>Hello world</div>
		)
	}
}

export default TeamsComparison;