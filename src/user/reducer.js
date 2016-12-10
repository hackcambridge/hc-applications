import { combineReducersByAction } from 'src/store';
import Rx from 'rxjs';
import { validateSignInCredentials } from './api';
import { ACTION_START_APP } from 'src/app';
import * as save from './save';

const BASE_NAME = 'user';
export const ACTION_SIGN_IN_SUBMITTED = `${BASE_NAME}/SIGN_IN_SUBMITTED`;
export const ACTION_ATTEMPT_SIGN_IN = `${BASE_NAME}/ATTEMPT_SIGN_IN`;
export const ACTION_SIGN_IN_FAILED = `${BASE_NAME}/SIGN_IN_FAILED`;
export const ACTION_SIGN_IN_SUCCEEDED = `${BASE_NAME}/SIGN_IN_SUCCEEDED`;

export const STATE_SIGNING_IN = 'STATE_SIGNING_IN';
export const STATE_SIGNED_OUT = 'STATE_SIGNED_OUT';
export const STATE_SIGNED_IN = 'STATE_SIGNED_IN';

const initialState = {
  signInState: STATE_SIGNED_OUT,
  authToken: null,
  userInfo: null,
};

// Action Creators

export function signInSubmitted(email, token) {
  return {
    type: ACTION_SIGN_IN_SUBMITTED,
    email,
    token,
  };
}

export function attemptSignIn(email, token) {
  return {
    type: ACTION_ATTEMPT_SIGN_IN,
    email,
    token,
  };
}

export function signInFailed() {
  return {
    type: ACTION_SIGN_IN_FAILED,
  };
}

export function signInSucceeded(userInfo, token) {
  return {
    type: ACTION_SIGN_IN_SUCCEEDED,
    userInfo,
    token,
  };
}

// Epics

export function epic(action$) {
  return Rx.Observable.merge(
    action$.ofType(ACTION_SIGN_IN_SUBMITTED)
      .map(({ email, token }) => attemptSignIn(email, token)),
    action$.ofType(ACTION_SIGN_IN_FAILED)
      .do({
        next() {
          save.clearSavedUser();
        }
      })
      .filter(() => false),
    action$.ofType(ACTION_START_APP)
      .filter(() => save.isUserSaved())
      .map(() => {
        const { email, token } = save.getSavedUser();
        return attemptSignIn(email, token);
      }),
    action$.ofType(ACTION_ATTEMPT_SIGN_IN)
      .switchMap(({ email, token }) => 
        Rx.Observable.fromPromise(validateSignInCredentials(email, token))
          .do({ 
            next() { 
              save.saveUser(email, token);
            },
          })
          .map(({ userInfo, token }) => signInSucceeded(userInfo, token))
          .catch((e) => Rx.Observable.of(signInFailed()))
      )
  );
}

// Reducers

const reducers = {
  [ACTION_ATTEMPT_SIGN_IN]: (state) => ({ ...state, signInState: STATE_SIGNING_IN }),
  [ACTION_SIGN_IN_FAILED]: (state) => ({ ...state, signInState: STATE_SIGNED_OUT }),
  [ACTION_SIGN_IN_SUCCEEDED]: (state, { authToken, userInfo}) => 
    ({ ...state, signInState: STATE_SIGNED_IN, authToken, userInfo }),
};

export const reducerMap = {
  [BASE_NAME]: combineReducersByAction(reducers, initialState),
};
