import * as types from '../actions/ActionTypes';

// helper function
const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

// actual reducer
const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
    case types.REQUEST_POSTS:
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
};

export default postsBySubreddit;


// using Object.assign here instead of spread
// Spread might cause some problems if the state is super nested? confirm this