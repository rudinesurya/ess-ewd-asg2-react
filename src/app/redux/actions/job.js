import axios from 'axios';
import {
  DELETE_COMMENT, DELETE_JOB, JOB_ERROR, JOB_START_REQUEST, JOIN_JOB, LEAVE_JOB, LOAD_JOB,
  LOAD_JOBS, POST_COMMENT, REGISTER_JOB, UPDATE_JOB,
} from '../actionTypes/actionTypes';

export const loadJob = jobId => async (dispatch, getState) => {
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
      payload: err.response.data,
    });
  }
};

export const loadJobs = (query, sortBy, page, limit) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOB_START_REQUEST });
    const res = await axios.get('/api/jobs', {
      params: {
        query,
        sortBy,
        page,
        limit,
      },
    });

    dispatch({
      type: LOAD_JOBS,
      payload: {
        docs: res.data.docs,
        page: res.data.page,
        pages: res.data.pages,
      },
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const createJob = ({
  title, payout, date, venue, description, urgency,
}) => async (dispatch, getState) => {
  try {
    const res = await axios.post('api/jobs', {
      title, payout, date, venue, description, urgency,
    });

    dispatch({
      type: REGISTER_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const updateJob = (jobId, {
  title, payout, date, venue, description,
}) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(`api/jobs/${jobId}`, {
      title, payout, date, venue, description,
    });

    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteJob = jobId => async (dispatch, getState) => {
  try {
    const res = await axios.delete(`api/jobs/${jobId}`);

    dispatch({
      type: DELETE_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const joinJob = jobId => async (dispatch, getState) => {
  try {
    const res = await axios.post(`api/jobs/join/${jobId}`);

    dispatch({
      type: JOIN_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const leaveJob = jobId => async (dispatch, getState) => {
  try {
    const res = await axios.post(`api/jobs/leave/${jobId}`);

    dispatch({
      type: LEAVE_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const postComment = (jobId, { text }) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`api/jobs/comment/${jobId}`, { text });

    dispatch({
      type: POST_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteComment = (jobId, commentId) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(`api/jobs/comment/${jobId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data,
    });
  }
};
