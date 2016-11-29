import Application from './Application';
import { fetchApplication } from './reducer';

export default function createRoute(store) {
  return {
    component: Application,
    path: 'applications/:id',
    onEnter(nextState, replace, callback) {
      store.dispatch(fetchApplication(nextState.params.id));
      callback();
    },
  }
}
