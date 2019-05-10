import { createReducer } from 'redux-create-reducer';
import { SET_CURRENT_USER } from '../actionTypes/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const setCurrentUser = (state, action) => ({
  ...state,
  isAuthenticated: !!action.payload,
  user: action.payload,
});

export default createReducer(initialState, {
  [SET_CURRENT_USER]: setCurrentUser,
});
