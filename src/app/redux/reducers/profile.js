import { createReducer } from 'redux-create-reducer';
import {
  CLEAR_PROFILE, LOAD_PROFILE, PROFILE_ERROR, PROFILE_START_REQUEST,
} from '../actionTypes/actionTypes';

const initialState = {
  loading: true,
  profile: null,
  error: {},
};

const beginLoading = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loadProfile = (state, action) => {
  return {
    ...state,
    loading: false,
    profile: action.payload,
  };
};

const clearProfile = (state) => {
  return {
    ...state,
    profile: null,
  };
};

const profileError = (state, action) => {
  return {
    ...state,
    error: action.payload,
  };
};

export default createReducer(initialState, {
  [PROFILE_START_REQUEST]: beginLoading,
  [LOAD_PROFILE]: loadProfile,
  [CLEAR_PROFILE]: clearProfile,
  [PROFILE_ERROR]: profileError,
});
