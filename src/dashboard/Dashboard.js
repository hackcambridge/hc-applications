import React from 'react';
import { Link } from 'react-router';
import { Container, Jumbotron, Row, Col, Progress, Button } from 'reactstrap';
import './dashboard.css';

function correctPlural(amount, singular = '', plural = 's') {
  return (amount === 1) ? singular : plural;
}

export default function Dashboard({ signups, applications, reviews, userReviews, userGoal, leaderboard, leaderboardPosition }) {
  return (
    <Container>
      <Jumbotron>
        <h3>{signups} sign up{correctPlural(signups)}</h3>
        <h1>{applications} Application{correctPlural(applications)}</h1>
        <p>{leaderboardPosition !== null ? "You are the #" + leaderboardPosition + " reviewer, keep at it!" : "We couldn't work out your leaderboard position, sorry!"}</p>
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
          Leaderboard:
          <ol>{leaderboard.map(reviewer => <li key={"leaderboard-entry-" + reviewer.id}><span className="leaderboard-name">{reviewer.name}</span>  &ndash; <span className="leaderboard-score">{reviewer.count}</span></li>)}</ol>
        </Col>
      </Row>
    </Container>
  );
}
