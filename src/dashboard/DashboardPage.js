import { componentFromStream } from 'recompose';
import { connect } from 'react-redux';
import Rx from 'rxjs';
import React from 'react';

import Dashboard from './Dashboard';
import { getStatsWithUser } from './api';

const mapStateToProps = ({ user: { authToken, userInfo: { id: userId } }}) => ({ authToken, userId });

export default connect(mapStateToProps)(componentFromStream(props$ => 
  Rx.Observable.combineLatest(
    props$
      .map(({ authToken }) => authToken)
      .distinctUntilChanged(),
    props$
      .map(({ userId }) => userId)
      .distinctUntilChanged(),
  )
    .switchMap(([authToken, userId]) => getStatsWithUser(authToken, userId).then(stats => {
    	const index = stats.globalStats.leaderboard.findIndex(reviewer => reviewer.id === userId);
		stats.userStats.leaderboardPosition = index !== -1 ? index + 1 : null;
		return stats;
    }))
    .map(({ globalStats, userStats }) => 
      <Dashboard 
        signups={globalStats.hackerCount}
        applications={globalStats.hackerApplicationCount}
        reviews={globalStats.applicationsReviewedCount}
        userReviews={userStats.applicationsReviewedCount}
        userGoal={userStats.applicationsReviewedGoal}
        leaderboard={globalStats.leaderboard}
        leaderboardPosition={userStats.leaderboardPosition} />
    ).startWith(<p>Loading...</p>)
));
