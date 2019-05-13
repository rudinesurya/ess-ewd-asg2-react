import axios from 'axios';
import {
  LOAD_PROFILE, PROFILE_ERROR, PROFILE_START_REQUEST, UPDATE_PROFILE,
} from '../actionTypes/actionTypes';

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({ type: PROFILE_START_REQUEST });
    const res = await axios.get('/api/profiles/current');

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const getProfileByUserId = userId => async dispatch => {
  try {
    dispatch({ type: PROFILE_START_REQUEST });
    const res = await axios.get(`/api/profiles/user/${userId}`);

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const updateProfile = ({ name, location, bio }) => async dispatch => {
  try {
    const res = await axios.post('/api/profiles/current/', { name, location, bio });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
