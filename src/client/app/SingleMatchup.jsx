import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

let SingleMatchup = (props) => {
  
  return (
    <Grid>
      <Row>
        <Col md={2}> {props.time} </Col>
        <Col md={4}> {props.home} </Col>
        <Col md={3}> {props.homeSpread} </Col>
        <Col md={3}> {props.homeLine} </Col> 
      </Row>
      <Row>
        <Col md={2}> </Col>
        <Col md={4}> {props.away} </Col>
        <Col md={3}> {props.awaySpread} </Col>
        <Col md={3}> {props.awayLine} </Col> 
      </Row>
    </Grid>
  );
}

export default OneMatchup;