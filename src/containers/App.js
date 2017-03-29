import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/index';

// import nested components here
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    } // only dispatch fetch if the selected subreddit changes
  }

  handleChange(nextSubreddit) {
    // console.log('nextSubreddit', nextSubreddit);
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
    dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend', 'reduxjs', 'nodejs', 'backend']} />

        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
            </span>
          }

          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>

        {isFetching && posts.length === 0 &&
          // <h2>Loading...</h2>
          <RefreshIndicator
            loadingColor="#cee3f8"
            size={40}
            left={10}
            top={0}
            status="loading"
            style={{
              display: 'inline-block',
              position: 'relative',
            }}
          />
        }

        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }

        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

// Proptypes Type Checking here ===========

const mapStateToProps = (state) => {
  // extracts the key/values from our global state
  const { postsBySubreddit, selectedSubreddit } = state;

  // maps to RELEVANT pieces of state for the selected subreddit 
  const {
    isFetching,
    lastUpdated,
    items: posts // extracts 'items' and calls it 'posts'
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  } // fallback values if that postsBySubreddit[selectedSubreddit] doesn't exist

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App);