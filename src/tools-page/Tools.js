import React from 'react';
import { Button, Container, Row } from 'reactstrap';

class Tools extends React.Component {
  render () {
    return (
      <Container>
        <Row><h2>CSVs of unfinished applications</h2></Row>

        <Row>
          <h3>Signed in but not started an application</h3>
          <p>Applicants who have logged in via MyMLH, but have not yet submitted an individual application.</p>
          <Button className="btn btn-lg btn-outline-dark btn-block" onClick={ () => this.props.downloadCsv('individual') }>Download</Button>
        </Row>

        <Row>
          <h3>Have yet to submit team grouping</h3>
          <p>Applicants who have submitted an individual application and said they wanted to apply in a team, but they
            haven't yet submitted their team grouping.</p>
          <Button className="btn btn-lg btn-outline-dark btn-block" onClick={ () => this.props.downloadCsv('team-only') }>Download</Button>
        </Row>
      </Container>
    );
  }
}

export default Tools;
