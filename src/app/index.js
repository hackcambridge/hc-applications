export { default as ConnectedApp } from './ConnectedApp';
export { ACTION_START_APP } from './reducer';

import { setObservableConfig } from 'recompose';
import rxjsconfig from 'recompose/rxjsObservableConfig';

setObservableConfig(rxjsconfig);
