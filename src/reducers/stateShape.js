const INITIAL_STATE = {
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      items: [
        { id: 42, title: 'Confusion about Flux and Relay' },
        { id: 500, title: 'Creating a Simple Application Using React JS and Flux Architecture' }
      ]
    },
  }
}