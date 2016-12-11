import { createAppStore } from 'src/store';
import { reducerMap as applicationReducerMap, epic as applicationEpic } from 'src/application';
import { reducerMap as userReducerMap, epic as userEpic } from 'src/user';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

export default function createStore() {
  return createAppStore(
    {
      ...applicationReducerMap,
      ...userReducerMap,
      routing: routerReducer,
    },
    combineEpics(
      userEpic,
      applicationEpic
    )
  );
}
