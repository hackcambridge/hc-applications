import { makeApiCall } from 'src/api';

export function getApplications(token) {
  return makeApiCall(token, `applications`)
    .then(({ applications }) => applications);
}