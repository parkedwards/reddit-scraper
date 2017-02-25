import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root.jsx';
import store from './store/index';

render(
  <Root store={store} />,
  document.querySelector('.container')
);