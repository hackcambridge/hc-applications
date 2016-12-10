/**
 * This module encapsulates the saving and retreiving of a signed in user
 */

const SAVED_EMAIL_KEY = 'HC_EMAIL';
const SAVED_TOKEN_KEY = 'HC_TOKEN';

export function saveUser(email, token) {
  window.localStorage.setItem(SAVED_EMAIL_KEY, email);
  window.localStorage.setItem(SAVED_TOKEN_KEY, token);
}

export function isUserSaved() {
  return (
    (window.localStorage.getItem(SAVED_EMAIL_KEY) != null) &&
    (window.localStorage.getItem(SAVED_TOKEN_KEY) != null)
  );
}

export function getSavedUser() {
  return {
    email: window.localStorage.getItem(SAVED_EMAIL_KEY),
    token: window.localStorage.getItem(SAVED_TOKEN_KEY),
  };
}

export function clearSavedUser() {
  window.localStorage.removeItem(SAVED_EMAIL_KEY);
  window.localStorage.removeItem(SAVED_TOKEN_KEY);
}
