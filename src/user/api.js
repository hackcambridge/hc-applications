import { makeApiCall } from 'src/api';

/**
 * Checks if a user is signed in. Returns a promise that will either
 * resolve with some user information and token or reject.
 */
export function validateSignInCredentials(email, token) {
  return Promise.all([
      makeApiCall(token, `admins/by-email/${email}`),
      makeApiCall(token, `tokens/${token}`),
  ]).then(([{ admin }, { token: { adminId } }]) => {
    if (admin.id !== adminId) {
      throw new Error('Token does not match email');
    }

    return {
      userInfo: admin,
      authToken: token,
    };
  });
}

export function getReview(token, adminId, applicationId) {
  return makeApiCall(token, `admins/${adminId}/reviews/${applicationId}`)
    .then(({ applicationReview }) => applicationReview);
}
