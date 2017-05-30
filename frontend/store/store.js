import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
// redux-logger will give us access to the previous state, action, and next state with each dispatch

// createStore() takes a reducer and optionally the initialState and an enhancer
const configureStore = () => {
  const logger = createLogger();
  /**
   * logger must be the last middleware passed into applyMiddleware
   * else it will log the thunk and any involved promises
   */
  const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));
  return store;
};

export default configureStore;
