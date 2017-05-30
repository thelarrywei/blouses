import { combineReducers } from 'redux';
// import sub-reducers here
import examples from './example_reducer';

const rootReducer = combineReducers({
  examples,
});

export default rootReducer;
