import ApplicationListing from './ApplicationListing';

export default function createRoute(store) {
  return {
    component: ApplicationListing,
    path: 'applications',
  };
}
