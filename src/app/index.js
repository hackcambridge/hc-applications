import { setObservableConfig } from 'recompose';
import rxjsconfig from 'recompose/rxjsObservableConfig';

export { default as ConnectedApp } from './ConnectedApp';
export { ACTION_START_APP } from './reducer';

setObservableConfig(rxjsconfig);
