import React from 'react';
import { Button, Container, Row } from 'reactstrap';

class Tools extends React.Component {
  renderCsvDownload(title, description, kind) {
    return (
      <Row>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button className="btn btn-lg btn-outline-dark btn-block" onClick={ () => this.props.downloadCsv(kind) }>Download</Button>
      </Row>
    );
  }

  render () {
    return (
      <Container>
        <Row><h2>CSVs of unfinished applications</h2></Row>

        {this.renderCsvDownload(
          'Signed in but not started an application',
          'Applicants who have logged in via MyMLH, but have not yet submitted an individual application.',
          'individual'
        )}

        {this.renderCsvDownload(
          'Have yet to submit team grouping',
          'Applicants who have submitted an individual application and said they wanted to apply in a team, but they ' +
          'haven’t yet submitted their team grouping.',
          'team-only'
        )}
      </Container>
    );
  }
}

export default Tools;
