import { createReducer } from 'redux-create-reducer';
import { FETCH_JOBS } from '../actionTypes/actionTypes';

const initialState = [];

const fetchJobs = (state, action) => action.payload.jobs;

export default createReducer(initialState, {
  [FETCH_JOBS]: fetchJobs,
});
