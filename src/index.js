import React from 'react';
import ReactDOM from 'react-dom';

import { makeApiCall } from 'src/api';
import { ConnectedApp } from 'src/app';

ReactDOM.render(
  <ConnectedApp />,
  document.getElementById('root')
);

window.makeApiCall = makeApiCall;