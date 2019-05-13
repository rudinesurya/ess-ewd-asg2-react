import { createReducer } from 'redux-create-reducer';
import { JOB_ERROR, JOB_START_REQUEST, LOAD_JOB, LOAD_JOBS } from '../actionTypes/actionTypes';

const initialState = {
  loading: true,
  job: null,
  jobs: [],
  error: {},
};

const beginLoading = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loadJob = (state, action) => {
  return {
    ...state,
    loading: false,
    job: action.payload,
  };
};

const loadJobs = (state, action) => {
  return {
    ...state,
    loading: false,
    jobs: action.payload,
  };
};

const jobError = (state, action) => {
  return {
    ...state,
    error: action.payload,
  };
};

export default createReducer(initialState, {
  [JOB_START_REQUEST]: beginLoading,
  [LOAD_JOB]: loadJob,
  [LOAD_JOBS]: loadJobs,
  [JOB_ERROR]: jobError,
});
