import React from 'react';
import { Link } from 'react-router';
import { Container, Jumbotron, Row, Col, Progress, Button } from 'reactstrap';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './dashboard.css';

function correctPlural(amount, singular = '', plural = 's') {
  return (amount === 1) ? singular : plural;
}

function statsToChartData({ applications, reviewed, rsvpedNo, ticketed, turnedDown, invited }) {
  const invitedData = invited - rsvpedNo - ticketed;
  const reviewedData = reviewed - invited - turnedDown;
  const unreviewed = applications - reviewed;

  return [
    { name: 'Unreviewed', value: unreviewed, fill: '#818a91' }, 
    { name: 'Reviewed', value: reviewedData, fill: '#0275d8' },
    { name: 'Invited', value: invitedData, fill: '#5bc0de' },
    { name: 'Turned Down', value: turnedDown, fill: '#f0ad4e' },
    { name: 'RSVP No', value: rsvpedNo, fill: '#d9534f' },
    { name: 'Ticketed', value: ticketed, fill: '#5cb85c' },
  ];
}

export default function Dashboard({ signups, applications, reviews, userReviews, userGoal, leaderboard, leaderboardPosition, ticketed, turnedDown, invited, rsvpedNo }) {
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
          <h3>Your target <small>({userReviews}/{userGoal})</small></h3>
          <Progress value={userReviews} max={userGoal} color="warning"/>
          <h3>Applicant Breakdown</h3>
            <ResponsiveContainer height={400}>
            <PieChart width={100} height={100}>
              <Pie
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                data={statsToChartData({ applications, reviewed: reviews, rsvpedNo, ticketed, turnedDown, invited })}/>
              <Tooltip/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md="6">
          Leaderboard:
          <ol>{leaderboard.map(reviewer => <li key={"leaderboard-entry-" + reviewer.id}><span className="leaderboard-name">{reviewer.name}</span>  &ndash; <span className="leaderboard-score">{reviewer.count}</span></li>)}</ol>
        </Col>
      </Row>
    </Container>
  );
}
