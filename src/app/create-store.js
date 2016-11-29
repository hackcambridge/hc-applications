import { createAppStore } from 'src/store';
import { reducerMap as applicationReducerMap } from 'src/application';
import { routerReducer } from 'react-router-redux';

export default function createStore() {
  return createAppStore(
    Object.assign(
      { },
      applicationReducerMap,
      { routing: routerReducer }
    )
  );
}