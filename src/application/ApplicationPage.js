import React from 'react';
import { connect } from 'react-redux';
import { componentFromStream } from 'recompose';
import shallowEquals from 'shallow-equals';
import Rx from 'rxjs';

import { submitReview } from './reducer';
import Application from './Application';
import { getApplicationWithReview } from './api';

const mapStateToProps = ({ application, user: { authToken, userInfo } }) => ({
  criteria: application.criteria,
  adminId: userInfo.id,
  authToken,
});

const mapDispatchToProps = {
  onSubmit: submitReview,
};

function getApplicationFromProps(props$) {
  return props$
    .map(({ params: { applicationId }, adminId, authToken }) => ({ applicationId, adminId, authToken }))
    .distinctUntilChanged(shallowEquals)
    .switchMap(({ applicationId, adminId, authToken }) => getApplicationWithReview(authToken, applicationId, adminId))
    .startWith(null);
}

function renderApplication(application, { criteria, onSubmit, adminId }) {
  if ((!application) || (!criteria)) {
    return <p>Loading...</p>;
  }

  const criteriaScores = { };

  if (application.review) {
    application.review.reviewCriterionScores.forEach(({ reviewCriterionId, score }) => {
      criteriaScores[reviewCriterionId] = score;
    });
  }

  return <Application
    application={application}
    criteria={criteria}
    criteriaScores={criteriaScores}
    key={application.id}
    onSubmit={(scores) => onSubmit(adminId, application.id, scores)} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(componentFromStream(props$ =>
  Rx.Observable.combineLatest(
    getApplicationFromProps(props$),
    props$,
    renderApplication
  )
));
