import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

let SingleMatchup = (props) => (
  <div className='single-matchup'>
  <Row>
    <Col md={2}> {props.time} </Col>
    <Col md={4}> {props.home} </Col>
    <Col md={2}> {props.homeSpread} </Col>
    <Col md={2}> {props.homeLine} </Col>
    <Col md={2}> {props.over} </Col> 
  </Row>
  <Row>
    <Col md={2}> </Col>
    <Col md={4}> {props.away} </Col>
    <Col md={2}> {props.awaySpread} </Col>
    <Col md={2}> {props.awayLine} </Col> 
    <Col md={2}> {props.under} </Col> 
  </Row>
  </div>
)

export default SingleMatchup;