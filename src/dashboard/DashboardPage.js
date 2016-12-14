import { componentFromStream } from 'recompose';
import { connect } from 'react-redux';
import Rx from 'rxjs';
import React from 'react';

import Dashboard from './Dashboard';
import { getStats } from './api';

const mapStateToProps = ({ user: { authToken }}) => ({ authToken });

export default connect(mapStateToProps)(componentFromStream(props$ => 
  props$
    .map(({ authToken }) => authToken)
    .distinctUntilChanged()
    .switchMap(authToken => getStats(authToken))
    .map(({ hackerCount, hackerApplicationCount, applicationsReviewedCount }) => 
      <Dashboard signups={hackerCount} applications={hackerApplicationCount} reviews={applicationsReviewedCount} />
    ).startWith(<p>Loading...</p>)
));
