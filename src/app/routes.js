import { route as dashboardRoute } from 'src/dashboard';
import { route as applicationRoute } from 'src/application';
import { route as applicationListingRoute } from 'src/application-listing';
import App from './App';

export default {
  path: '/',
  component: App,
  indexRoute: dashboardRoute,
  childRoutes: [
    applicationRoute,
    applicationListingRoute,
  ],
}
