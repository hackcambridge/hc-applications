import React from 'react';
import { Card, CardText, Col, Button, Form } from 'reactstrap';
import { Link } from 'react-router';

import './application.css';
import ApplicationText from './ApplicationText';
import Criterion from './Criterion';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteriaValues: Object.assign({ }, this.props.criteriaScores),
    };
  }

  updateCriterion(criterionId, value) {
    this.setState({
      criteriaValues: {
        ...this.state.criteriaValues,
        [criterionId]: value,
      }
    });
  }

  shouldEnableSubmitButton() {
    return this.props.criteria.every(({ id }) => (this.state.criteriaValues[id] != null));
  }

  getCriteriaValuesAsArray() {
    return Object.keys(this.state.criteriaValues).map((criterionId) => ({ 
      reviewCriterionId: criterionId, 
      score: this.state.criteriaValues[criterionId],
    }));
  }

  render() {
    return (
      <div className="review-container">
        <div className="panel-container">
          <Col md="8" className="cv-panel">
            <object data={this.props.application.cv} type="application/pdf">Loading CV...</object>
          </Col>
          <Col md="4" className="details-panel">

            <Card block className="cv-link">
              <CardText>
                <a href={this.props.application.cv} target="_blank">
                  Read CV &rarr;
                </a>
              </CardText>
            </Card>
            <h6>Learning goals:</h6>
            <ApplicationText text={this.props.application.learningGoal} />

            <h6>Interests:</h6>
            <ApplicationText text={this.props.application.interests} />

            <h6>Recent accomplishments:</h6>
            <ApplicationText text={this.props.application.recentAccomplishment} />

            <h6>Links:</h6>
            <ApplicationText text={this.props.application.links} />

            <h6>Roles interested in:</h6>
            <ApplicationText text={this.props.application.developmentRoles.length === 0 ? 'Don’t know yet' : this.props.application.developmentRoles.join(', ')} />

            <h6>Anything else we should know:</h6>
            <ApplicationText text={this.props.application.otherInfo || ''} />
          </Col>
        </div>

        <footer className="footer">
          <Form inline tag="div">
            {this.props.criteria.map((criterion) =>
              <Criterion 
                criterion={criterion}
                score={this.state.criteriaValues[criterion.id]}
                key={criterion.id}
                onChange={(value) => this.updateCriterion(criterion.id, value)} />)}

            <Button
              color="warning"
              className="footer-button"
              tag={Link}
              to='/applications/next'>Skip</Button>

            <Button
              color="success"
              className="footer-button"
              disabled={!this.shouldEnableSubmitButton()}
              onClick={() => this.props.onSubmit(this.getCriteriaValuesAsArray())}>Next</Button>
          </Form>
        </footer>
      </div>
    );
  }
}
