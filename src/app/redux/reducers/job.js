import { createReducer } from 'redux-create-reducer';
import {
  DELETE_COMMENT, DELETE_JOB, JOB_ERROR, JOB_START_REQUEST, JOIN_JOB, LEAVE_JOB, LOAD_JOB,
  LOAD_JOBS, POST_COMMENT, REGISTER_JOB, UPDATE_JOB,
} from '../actionTypes/actionTypes';

const initialState = {
  loading: true,
  job: null,
  jobs: [],
  error: {},
};

const beginLoading = (state, action) => ({
  ...state,
  loading: true,
});

const loadJob = (state, action) => ({
  ...state,
  loading: false,
  job: action.payload,
  error: {},
});

const loadJobs = (state, action) => ({
  ...state,
  loading: false,
  jobs: action.payload.docs,
  page: action.payload.page,
  pages: action.payload.pages,
  error: {},
});

const setResult = (state, action) => ({
  ...state,
  result: action.payload,
  error: {},
});

const jobError = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

export default createReducer(initialState, {
  [JOB_START_REQUEST]: beginLoading,
  [LOAD_JOB]: loadJob,
  [LOAD_JOBS]: loadJobs,
  [REGISTER_JOB]: setResult,
  [UPDATE_JOB]: setResult,
  [DELETE_JOB]: setResult,
  [JOIN_JOB]: setResult,
  [LEAVE_JOB]: setResult,
  [POST_COMMENT]: setResult,
  [DELETE_COMMENT]: setResult,
  [JOB_ERROR]: jobError,
});
