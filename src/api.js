import 'whatwg-fetch';
const API_BASE = process.env.REACT_APP_HC_API_BASE;

export function makeRawApiCall(accessToken, endpoint, options = { }) {
  const headers = new Headers(options.headers || { });

  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Content-Type', 'application/json');

  return fetch(`${API_BASE}${endpoint}`, Object.assign({ credentials: true }, options, { headers }));
}

export function makeApiCall(accessToken, endpoint, options) {
  return makeRawApiCall(accessToken, endpoint, options)
    .then(response => response.json());
}
