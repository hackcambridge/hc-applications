import { componentFromStream } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';

import ApplicationList from './ApplicationList.js';
import { getApplications } from './api';

const mapStateToProps = ({ user: { authToken }}) => ({ authToken });

export default connect(mapStateToProps)(componentFromStream(props$ => 
  props$
    .map(({ authToken }) => authToken)
    .distinctUntilChanged()
    .switchMap(authToken => getApplications(authToken))
    .map((applications) => 
      <ApplicationList applications={applications} />
    ).startWith(<p>Loading...</p>)
));