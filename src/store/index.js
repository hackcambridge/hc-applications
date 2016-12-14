import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export function createAppStore(reducerMap, rootEpic) {
  return createStore(
    combineReducers(reducerMap),
    composeWithDevTools(
      applyMiddleware(
        createEpicMiddleware(rootEpic),
        routerMiddleware(browserHistory)
      ),
    )
  );
}

/**
 * Takes a map of action types to reducers, and returns a composite reducer.
 * When it takes in an action, it will pick the corresponding reducer based on
 * the action's type.
 */
export function combineReducersByAction(reducerMap, initialState) {
  return (state = initialState, action) => {
    if (action.type in reducerMap) {
      return reducerMap[action.type](state, action);
    }

    return state;
  };
}
