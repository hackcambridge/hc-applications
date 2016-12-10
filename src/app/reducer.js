const base = 'app';

export const ACTION_START_APP = `${base}/START_APP`;

export function startApp() {
  return {
    type: ACTION_START_APP,
  };
}
