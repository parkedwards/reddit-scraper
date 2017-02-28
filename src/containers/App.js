import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/index';

// import nested components here
import Picker from '../components/Picker';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
    dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend', 'reduxjs', 'nodejs', 'backend']} />
        Heyo!
      </div>
    );
  }
}

// Proptypes Type Checking here ===========

const mapStateToProps = (state) => {
  console.log('===========')
  console.log('state', state);
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