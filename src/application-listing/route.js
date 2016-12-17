import ApplicationListingPage from './ApplicationListingPage';

export default function createRoute(store) {
  return {
    component: ApplicationListingPage,
    path: 'applications',
  };
}
