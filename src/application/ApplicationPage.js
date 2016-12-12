import React from 'react';
import { connect } from 'react-redux';

import { submitReview } from './reducer';
import Application from './Application';

function ApplicationPage({ application, criteria, onSubmit, adminId }) {
  if ((!application) || (!criteria)) {
    return <p>Loading...</p>;
  }

  return <Application
    application={application}
    criteria={criteria}
    key={application.id}
    onSubmit={(scores) => onSubmit(adminId, application.id, scores)} />;
}

const mapStateToProps = ({ application, user: { userInfo } }) => ({
  ...application,
  adminId: userInfo.id,
});

const mapDispatchToProps = {
  onSubmit: submitReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);