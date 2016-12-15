import React from 'react';
import { Link } from 'react-router';
import { Container, Jumbotron, Row, Col, Progress, Button } from 'reactstrap';

function correctPlural(amount, singular = '', plural = 's') {
  return (amount == 1) ? singular : plural;
}

export default function Dashboard({ signups, applications, reviews, userReviews, userGoal }) {
  return (
    <Container>
      <Jumbotron>
        <h3>{signups} sign up{correctPlural(signups)}</h3>
        <h1>{applications} Application{correctPlural(applications)}</h1>
        <p>You are the #5 reviewer, keep at it! (not working yet)</p>
        <Button tag={Link} to='/applications/next' color="primary">Start Reviewing</Button>{' '}
        <Button tag={Link} to='/applications' size="large" color="success">See all Applications</Button>
      </Jumbotron>
      <Row>
        <Col md="6">
          Group target ({reviews}/{applications}):
          <Progress value={reviews} max={applications} color="success"/>
          Personal target ({userReviews}/{userGoal}):
          <Progress value={userReviews} max={userGoal} color="warning"/>
        </Col>
        <Col md="6">
          Leaderboard (not working yet):
          <ol>
            <li className="h4">
              Steve
            </li>
            <li>
              Alice
            </li>
            <li>
              Joe
            </li>
            <li>
              Jane
            </li>
          </ol>
        </Col>
      </Row>
    </Container>
  );
}
