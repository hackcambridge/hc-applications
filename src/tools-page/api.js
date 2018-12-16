import { makePlainApiCall } from 'src/api';

export function getCsvOfUnfinishedApplications(token, kind) {
  return makePlainApiCall(token, `applications/unfinished/${kind}`);
}