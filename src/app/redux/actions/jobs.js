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
