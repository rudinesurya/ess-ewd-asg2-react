import axios from 'axios';
import {
  DELETE_JOB, JOB_ERROR, JOB_START_REQUEST, LOAD_JOB, LOAD_JOBS, REGISTER_JOB, UPDATE_JOB,
} from '../actionTypes/actionTypes';

export const loadJob = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_START_REQUEST });
    const res = await axios.get(`api/jobs/${jobId}`);
    dispatch({
      type: LOAD_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const loadJobs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_START_REQUEST });
    const res = await axios.get('/api/jobs');

    dispatch({
      type: LOAD_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const createJob = ({ title, payout, date, venue, description }) => async (dispatch, getState) => {
  try {
    const res = await axios.post('api/jobs', { title, payout, date, venue, description });

    dispatch({
      type: REGISTER_JOB,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const updateJob = ({ jobId, title, payout, date, venue, description }) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(`api/jobs/${jobId}`, { title, payout, date, venue, description });

    dispatch({
      type: UPDATE_JOB,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const deleteJob = (jobId) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(`api/jobs/${jobId}`);

    dispatch({
      type: DELETE_JOB,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};
