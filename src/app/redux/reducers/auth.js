import { createReducer } from 'redux-create-reducer';
import {
  AUTH_ERROR, LOAD_CURRENT_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS,
} from '../actionTypes/actionTypes';

const initialState = {
  loading: true,
  isAuthenticated: null,
  user: null,
};

const loadCurrentUser = (state, action) => ({
  ...state,
  loading: false,
  isAuthenticated: true,
  user: action.payload,
});

const setToken = (state, action) => {
  localStorage.setItem('jwtToken', action.payload); // Store token to local storage
  return state;
};

const removeCurrentUser = (state) => {
  localStorage.removeItem('jwtToken'); // Remove token from local storage
  return {
    ...state,
    loading: false,
    isAuthenticated: false,
    user: null,
  };
};

export default createReducer(initialState, {
  [LOAD_CURRENT_USER]: loadCurrentUser,
  [REGISTER_SUCCESS]: setToken,
  [LOGIN_SUCCESS]: setToken,
  [REGISTER_FAIL]: removeCurrentUser,
  [LOGIN_FAIL]: removeCurrentUser,
  [LOGOUT]: removeCurrentUser,
  [AUTH_ERROR]: removeCurrentUser,
});
