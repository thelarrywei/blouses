import { merge } from 'lodash';
import { RECEIVE_EXAMPLE } from '../actions/example_actions';

const initialState = {
  0: {
    id: 0,
    of: 'resource',
    body: 'Todo object',
  },
  1: {
    id: 1,
    of: 'name',
    body: 'Julian',
  },
};

const exampleReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch (action.type) {
    case (RECEIVE_EXAMPLE):
      return merge(nextState, { [action.example.id]: action.example });
    default:
      return state;
  }
};

export default exampleReducer;
