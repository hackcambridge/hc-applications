import { makeApiCall } from 'src/api';

export function getStats(authToken) {
  return makeApiCall(authToken, `stats`);
}
