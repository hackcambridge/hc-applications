import Rx from 'rxjs';
import { push } from 'react-router-redux';

import { combineReducersByAction } from 'src/store';
import { ACTION_SIGN_IN_SUCCEEDED } from 'src/user';
import * as api from './api';

const BASE_NAME = 'application';
const ACTION_FETCH_APPLICATION = `${BASE_NAME}/FETCH_APPLICATION`;
const ACTION_DISPLAY_APPLICATION = `${BASE_NAME}/DISPLAY_APPLICATION`;
const ACTION_SUBMIT_REVIEW = `${BASE_NAME}/SUBMIT_REVIEW`;

const ACTION_SET_CRITERIA = `${BASE_NAME}/SET_CRITERIA`;

const initialState = {
  application: null,
  criteria: null,
};

// Action Creators

export function fetchApplication(applicationId) {
  return {
    type: ACTION_FETCH_APPLICATION,
    applicationId,
  };
}

export function displayApplication(application) {
  return {
    type: ACTION_DISPLAY_APPLICATION,
    application,
  }
}

export function submitReview(adminId, applicationId, scores) {
  return {
    type: ACTION_SUBMIT_REVIEW,
    scores,
    adminId,
    applicationId,
  };
}

export function setCriteria(criteria) {
  return {
    type: ACTION_SET_CRITERIA,
    criteria,
  };
}

// Epic

export function epic(action$, store) {
  return Rx.Observable.merge(
    action$.ofType(ACTION_SIGN_IN_SUCCEEDED)
      .switchMap(() => api.getReviewCriteria(store.getState().user.authToken))
      .map(setCriteria),
    action$.ofType(ACTION_FETCH_APPLICATION)
      .switchMap(({ applicationId }) => api.getApplication(store.getState().user.authToken, applicationId))
      .map(displayApplication),
    action$.ofType(ACTION_SUBMIT_REVIEW)
      .switchMap(({ scores, adminId, applicationId }) =>
        api.submitReview(store.getState().user.authToken, adminId, applicationId, scores)
      )
      .map(() => push('/applications/next'))
  );
}

// Reducers

const reducers = {
  [ACTION_DISPLAY_APPLICATION]: (state, { application }) => ({
    ...state,
    application,
  }),
  [ACTION_FETCH_APPLICATION]: (state) => ({
    ...state,
    application: null
  }),
  [ACTION_SET_CRITERIA]: (state, { criteria }) => ({ ...state, criteria }),
}

export const reducerMap = {
  [BASE_NAME]: combineReducersByAction(reducers, initialState),
};
