import logger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
const loggerMiddleware = logger();

// reducers
import postsBySubreddit from '../reducers/postsBySubreddit';
import selectedSubreddit from '../reducers/selectedSubreddit';

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);


export default store;