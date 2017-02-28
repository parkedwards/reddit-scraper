import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root;3