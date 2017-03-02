import * as types from './ActionTypes';
import fetch from 'isomorphic-fetch';


export const selectSubreddit = (subreddit) => {
  console.log('SELECTED SUBREDDIT ==============');
  return {
    type: types.SELECT_SUBREDDIT,
    subreddit
  };
};

export const invalidateSubreddit = (subreddit) => {
  console.log('INVALIDATE SUBREDDIT ==============');
  return {
    type: types.INVALIDATE_SUBREDDIT,
    subreddit
  };
};

export const requestPosts = (subreddit) => {
  console.log('REQUEST POSTS ==============');
  return {
    type: types.REQUEST_POSTS,
    subreddit
  }
}

export const receivePosts = (subreddit, json) => {
  console.log('RECEIVE POSTS ==============');
  return {
    type: types.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

// in a real app, you'd want error handling on request failure
// no error handling now, check out the 'real-world' example




// A THUNK FUNCTION
// note: it's actually a helper function
const fetchPosts = (subreddit) => {
  
  return (dispatch) => { // thunk passes the dispatch method as an arg

    dispatch(requestPosts(subreddit)); // we inform the app state that an API call is starting

    // return value is the fetch Promise
    // note, you can call 'dispatch' as many times within .then( )
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  }

  // in a real world app, you'd also want .catch( ) for error handling
}


// a helper to check if the state you pass in
// contains 'posts' - returns a boolean
const shouldFetchPosts = (state, subreddit) => {
  console.log('state', state);
  const posts = state.postsBySubreddit[subreddit];
  
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
};

// another THUNK function:
export const fetchPostsIfNeeded = (subreddit) => {
  console.log('FETCH POSTS IF NEEDED ==============');
  
  return (dispatch, getState) => { // 2nd thunk arg is getState, which gets the current state
    if (shouldFetchPosts(getState(), subreddit)) { // check if state has data in store
      return dispatch(fetchPosts(subreddit)) // if it doesn't, fetch
    } else {
      return Promise.resolve() // lets code know there's nothing to wait for
    }
  }
}