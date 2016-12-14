import React from 'react';
import ApplicationPage from './ApplicationPage';
import NoReviews from './NoReviews';
import { fetchApplication } from './reducer';
import { getNextReviewApplicationId } from './api';

export default function createRoutes(store) {
  return [
    {
      component: NoReviews,
      path: 'applications/next',
      onEnter(nextState, replace, callback) {
        const { user: { authToken, userInfo: { id }}} = store.getState();
        getNextReviewApplicationId(authToken, id)
          .then((applicationId) => {
            if (applicationId != null) {
              replace(`/applications/${applicationId}`);
            }

            callback();
          });
      }
    },
    {
      component: ApplicationPage,
      path: 'applications/:applicationId',
      onEnter(nextState, replace, callback) {
        callback();
      },
    }
  ];
}
