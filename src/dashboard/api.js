import { makeApiCall } from 'src/api';

export function getGlobalStats(authToken) {
  return makeApiCall(authToken, `stats`);
}

export function getUserStats(authToken, adminId) {
  return makeApiCall(authToken, `admins/${adminId}/stats`);
}

export function getStatsWithUser(authToken, adminId) {
  return Promise.all([
    getGlobalStats(authToken),
    getUserStats(authToken, adminId),
  ]).then(([globalStats, userStats]) => ({ globalStats, userStats }));
}
