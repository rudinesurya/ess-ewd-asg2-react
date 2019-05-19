import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  AUTH_ERROR, CLEAR_PROFILE, LOAD_CURRENT_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actionTypes/actionTypes';

export const loadCurrentUser = () => async (dispatch) => {
  if (!localStorage.jwtToken) return;

  try {
    setAuthToken(localStorage.jwtToken);
    const res = await axios.get('/api/users/current');

    dispatch({
      type: LOAD_CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
  }
};

/**
 * Register new user
 *
 * @param userData
 * @returns {Function}
 */
export const registerUser = ({
  name, email, password, password2,
}) => async (dispatch) => {
  const payload = {
    name, email, password, password2,
  };

  try {
    const res = await axios.post('/api/users', payload);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadCurrentUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

/**
 * Login
 *
 * @param userData
 * @returns {Function}
 */
export const loginUser = ({ email, password }) => async (dispatch) => {
  const payload = { email, password };
  try {
    const res = await axios.post('/api/users/login', payload);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadCurrentUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

/**
 * Logout current user
 *
 * @returns {Function}
 */
export const logoutUser = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
