import React from 'react';
import { connect } from 'react-redux';
import { Col, Progress, Button, Form, FormGroup, Input, Label } from 'reactstrap';

function Application({ id, firstName, lastName }) {
  return (
    <div>
      <Col md="9">
        CV
      </Col>
      <Col md="3">
        <h5>Application {id}: {firstName} {lastName}</h5>
        <h6>Learning Goals:</h6>
        <p>
          Lots of things
        </p>

        <h6>Interests:</h6>
        <p>
          Lots of things!
        </p>

        <h6>Recent Accomplishments:</h6>
        <p>
          Made a Hack Cambridge reviewing system
        </p>


        <h6>Links:</h6>
        <ul>
          <li><a href="#">github.net</a></li>
          <li><a href="#">linkedout.com.au</a></li>
        </ul>
        <Form>
          <FormGroup tag="fieldset">
            <legend>Technical Skill</legend>
              <Label check>
                <Input type="radio" name="technical" value="0"/>{'0'}
              </Label>
              <Label check>
                <Input type="radio" name="technical" value="1"/>{'1'}
              </Label>
              <Label check>
                <Input type="radio" name="technical" value="2"/>{'2'}
              </Label>
              <Label check>
                <Input type="radio" name="technical" value="3"/>{'3'}
              </Label>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Enthusiasm</legend>
              <Label check>
                <Input type="radio" name="enthusiasm" value="0"/>{'0'}
              </Label>
              <Label check>
                <Input type="radio" name="enthusiasm" value="1"/>{'1'}
              </Label>
              <Label check>
                <Input type="radio" name="enthusiasm" value="2"/>{'2'}
              </Label>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>WOW Point</legend>
              <Label check>
                <Input type="checkbox" name="wow" />{'Wow!'}
              </Label>
          </FormGroup>
          <Button color="success">Next</Button>
        </Form>
      </Col>
    </div>
  );
}

function mapStateToProps({ application }) {
  return application;
}

export default connect(mapStateToProps)(Application);
