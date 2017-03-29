import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

const Root = ({ store }) => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  )
}

export default Root;