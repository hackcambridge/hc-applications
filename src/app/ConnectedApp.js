import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react';

import createRoutes from './routes';
import createStore from './create-store';

const store = createStore();
const routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Represents the application when hooked up to state and routes
 */
export default function ConnectedApp() {
  return (
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
  );
}