import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from '../actionTypes/actionTypes';

/**
 * Register new user
 *
 * @param userData
 * @returns {Function}
 */
export const registerUser = userData => (dispatch) => {
  const creds = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    password2: userData.password2,
  };

  axios
    .post('/api/users', creds)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token); // Set token to Auth header
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded)); // Set current user
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

/**
 * Login
 *
 * @param userData
 * @returns {Function}
 */
export const loginUser = userData => (dispatch) => {
  const creds = {
    email: userData.email,
    password: userData.password,
  };

  axios
    .post('api/users/login', creds)
    .then((res) => {
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token); // Set token to Auth header
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded)); // Set current user
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

/**
 * Logout current user
 *
 * @returns {Function}
 */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken'); // Remove token from local storage
  setAuthToken(null); // Reset the auth token
  dispatch(setCurrentUser(null)); // Reset current user as well
};

/**
 * Set current user
 *
 * @param decoded
 * @returns {{payload: *, type: *}}
 */
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});
