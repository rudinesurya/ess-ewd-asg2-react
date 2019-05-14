import { createReducer } from 'redux-create-reducer';
import {
  CLEAR_PROFILE, LOAD_PROFILE, PROFILE_ERROR, PROFILE_START_REQUEST, UPDATE_PROFILE,
} from '../actionTypes/actionTypes';

const initialState = {
  loading: true,
  profile: null,
  error: {},
};

const beginLoading = (state, action) => ({
  ...state,
  loading: true,
});

const loadProfile = (state, action) => ({
  ...state,
  loading: false,
  profile: action.payload,
  error: {},
});

const setResult = (state, action) => ({
  ...state,
  result: action.payload,
  error: {},
});

const clearProfile = state => ({
  ...state,
  profile: null,
  error: {},
});

const profileError = (state, action) => ({
  ...state,
  error: action.payload,
});

export default createReducer(initialState, {
  [PROFILE_START_REQUEST]: beginLoading,
  [LOAD_PROFILE]: loadProfile,
  [UPDATE_PROFILE]: setResult,
  [CLEAR_PROFILE]: clearProfile,
  [PROFILE_ERROR]: profileError,
});
