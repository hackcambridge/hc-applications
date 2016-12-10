import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { SignInBarrier } from 'src/user';
import { startApp } from './reducer';
import createStore from './create-store';
import createRoutes from './routes';

/**
 * Represents the application when hooked up to state and routes (aka the real world)
 */
export default class ConnectedApp extends React.Component {
  componentWillMount() {
    this.store = createStore();
    this.routes = createRoutes(this.store);
    this.store.dispatch(startApp());
    this.history = syncHistoryWithStore(browserHistory, this.store);
  }

  render() {
    return (
      <Provider store={this.store}>
        <SignInBarrier>
          <Router routes={this.routes} history={this.history} />
        </SignInBarrier>
      </Provider>
    );
  }
}