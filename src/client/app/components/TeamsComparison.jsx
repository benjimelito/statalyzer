import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

const TeamsComparison = (props) => (
  <div className='teams-comparison'> 
    <Row>
      <Col md={6} className='team'> {props.away}</Col>
      <Col md={6} className='team'> {props.home} </Col>
    </Row>
  </div>
)

export default TeamsComparison;