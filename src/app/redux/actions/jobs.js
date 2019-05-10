import axios from 'axios';
import { FETCH_JOBS } from '../actionTypes/actionTypes';

export const fetchJobs = () => async (dispatch, getState) => {
  axios.get('api/jobs')
    .then((jobs) => {
      dispatch({
        type: FETCH_JOBS,
        payload: { jobs },
      });
    });
};

export const createJob = userData => async (dispatch, getState) => {
  console.log(userData);
  axios.post('api/jobs', userData);
};

export const updateJob = (_id, userData) => async (dispatch, getState) => {
  axios.patch(`api/jobs/${_id}`, userData);
};

export const deleteJob = _id => async (dispatch, getState) => {
  axios.delete(`api/jobs/${_id}`);
};
