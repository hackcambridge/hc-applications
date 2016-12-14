import { route as dashboardRoute } from 'src/dashboard';
import { routes as applicationRoutes } from 'src/application';
import { route as applicationListingRoute } from 'src/application-listing';
import App from './App';

export default function createRoutes(store) {
  return {
    path: '/',
    component: App,
    indexRoute: dashboardRoute(store),
    childRoutes: [
      ...applicationRoutes(store),
      applicationListingRoute(store),
    ],
  };
}
