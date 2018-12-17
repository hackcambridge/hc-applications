import { componentFromStream } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';

import { getCsvOfUnfinishedApplications } from './api';
import Tools from './Tools.js';

const mapStateToProps = ({ user: { authToken }}) => ({ authToken });

function buildCsvFileName(kind) {
  const dateString = new Date().toISOString().slice(0, 10);
  return `unfinished-applications-${kind}-${dateString}.csv`;
}

async function downloadCsv(token, kind) {
  const element = document.createElement("a");
  const file = new Blob([await getCsvOfUnfinishedApplications(token, kind)], {type: 'text/csv'});
  element.href = URL.createObjectURL(file);
  element.download = buildCsvFileName(kind);
  element.click();
}

export default connect(mapStateToProps)(componentFromStream(props$ => 
  props$
    .map(({ authToken }) => authToken)
    .distinctUntilChanged()
    .map((authToken) => 
      <Tools downloadCsv={(kind) => downloadCsv(authToken, kind)} />
    ).startWith(<p>Loading...</p>)
));
