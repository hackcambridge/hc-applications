import React from 'react';
import { Link } from 'react-router';
import { Container, Jumbotron, Row, Col, Progress, Button } from 'reactstrap';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './dashboard.css';

function correctPlural(amount, singular = '', plural = 's') {
  return (amount === 1) ? singular : plural;
}

function DashboardJumbotron({ signups, applications, leaderboardPosition }) {
  return (
    <Jumbotron>
      <h3>{signups} sign up{correctPlural(signups)}</h3>
      <h1>{applications} Application{correctPlural(applications)}</h1>
      <p>{leaderboardPosition !== null ? "You are the #" + leaderboardPosition + " reviewer, keep at it!" : "We couldn't work out your leaderboard position, sorry!"}</p>
      <Button tag={Link} to='/applications/next' color="primary">Start Reviewing</Button>{' '}
      <Button tag={Link} to='/applications' size="large" color="success">See all Applications</Button>
    </Jumbotron>
  );
}

function ApplicantBreakdown({ applicationCount, reviewedCount, rsvpedNoCount, ticketedCount, turnedDownCount, invitedCount, expiredCount }) {
  return (
    <div>
      <h3>Applicant Breakdown</h3>
      <ResponsiveContainer height={400}>
        <PieChart width={100} height={100}>
          <Pie
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            data={[
              { name: 'Reviewed', value: reviewedCount, fill: '#0275d8' },
              { name: 'Awaiting Review', value: applicationCount - reviewedCount, fill: '#aaa' },
            ]} />
          <Pie
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={75}
            fill="#8884d8"
            dataKey="value"
            data={[
              { name: 'Invited', value: invitedCount, fill: '#5bc0de' },
              { name: 'Turned Down', value: turnedDownCount, fill: '#f0ad4e' },
              { name: 'Awaiting Response', value: applicationCount - invitedCount - turnedDownCount, fill: '#bbb' },
            ]} />
          <Pie
            cx="50%"
            cy="45%"
            outerRadius={50}
            endAngle={invitedCount / applicationCount * 360}
            fill="#8884d8"
            dataKey="value"
            data={[
              { name: 'RSVP No', value: rsvpedNoCount, fill: '#d9534f' },
              { name: 'Expired', value: expiredCount, fill: '#333' },
              { name: 'Ticketed', value: ticketedCount, fill: '#5cb85c' },
              { name: 'Awaiting RSVP', value: invitedCount - rsvpedNoCount - expiredCount - ticketedCount, fill: '#ccc' },
            ]} />
          <Tooltip/>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function LeaderboardItem({ name, count }) {
  return (
    <li>
      <span className="leaderboard-name">{name}</span>  &ndash; <span className="leaderboard-score">{count}</span>
    </li>
  );
}

function Leaderboard({ leaderboard }) {
  return (
    <div>
      <h3>Leaderboard:</h3>
      <ol>
        {leaderboard.map(reviewer => <LeaderboardItem key={reviewer.id} {...reviewer} />)}
      </ol>
    </div>
  );
}

export default function Dashboard({ globalStats, userStats }) {
  return (
    <Container>
      <DashboardJumbotron
        signups={globalStats.hackerCount}
        applications={globalStats.hackerApplicationCount}
        leaderboardPosition={userStats.leaderboardPosition} />
      <Row>
        <Col md="6">
          <h3>Your target <small>({userStats.applicationsReviewedCount}/{userStats.applicationsReviewedGoal})</small></h3>
          <Progress value={userStats.applicationsReviewedCount} max={userStats.applicationsReviewedGoal} color="warning" />
          <ApplicantBreakdown
            applicationCount={globalStats.hackerApplicationCount}
            reviewedCount={globalStats.applicationsReviewedCount}
            rsvpedNoCount={globalStats.rsvpNoCount}
            ticketedCount={globalStats.ticketCount}
            turnedDownCount={globalStats.rejectionsCount}
            invitedCount={globalStats.invitationsCount}
            expiredCount={globalStats.expiredCount} />
        </Col>
        <Col md="6">
          <Leaderboard leaderboard={globalStats.leaderboard} />
        </Col>
      </Row>
      <Row>
        <Button className="button-right" tag={Link} to='/tools' size="small">Tools</Button>
      </Row>
    </Container>
  );
}
