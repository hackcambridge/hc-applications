import { makeApiCall } from 'src/api';

export function getApplication(token, applicationId) {
  return makeApiCall(token, `applications/${applicationId}`)
    .then(({ application }) => application);
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
