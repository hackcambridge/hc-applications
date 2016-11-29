import { combineReducersByAction } from 'src/store';

const BASE_NAME = 'application';
const ACTION_FETCH_APPLCATION = `${BASE_NAME}/FETCH_APPLICATION`;

const initialState = { };

// Action Creators

export function fetchApplication(id) {
  return {
    type: ACTION_FETCH_APPLCATION,
    id,
  };
}

// Reducers

const reducers = {
  [ACTION_FETCH_APPLCATION]: (state, { id }) => Object.assign({ }, state, {
    id,
    firstName: 'Kared',
    lastName: 'Jhan',
  }),
}

export const reducerMap = {
  [BASE_NAME]: combineReducersByAction(reducers, initialState),
};
