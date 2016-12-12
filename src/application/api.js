import { makeApiCall, makeRawApiCall } from 'src/api';
import { getReview } from 'src/user';

export function getApplication(token, applicationId) {
  return makeApiCall(token, `applications/${applicationId}`)
    .then(({ application }) => application);
}

export function getApplicationWithReview(token, applicationId, adminId) {
  return Promise.all([
    getApplication(token, applicationId),
    getReview(token, adminId, applicationId),
  ]).then(([application, review]) => ({ ...application, review }));
}

export function getReviewCriteria(token) {
  return makeApiCall(token, 'criteria')
    .then(({ criteria }) => criteria);
}

export function getNextReviewApplicationId(token, adminId) {
  return makeApiCall(token, `admins/${adminId}/next-review-application`)
    .then(({ applicationId }) => applicationId);
}

export function submitReview(token, adminId, applicationId, scores) {
  return makeApiCall(token, `admins/${adminId}/reviews/${applicationId}`, {
    method: 'POST',
    body: JSON.stringify({
      scores: scores,
    }),
  });
}
