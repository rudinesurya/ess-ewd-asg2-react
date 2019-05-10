import { createReducer } from 'redux-create-reducer';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes/actionTypes';

const initialState = {};

const getErrors = (state, action) => (action.payload);

const clearErrors = () => ({});

export default createReducer(initialState, {
  [GET_ERRORS]: getErrors,
  [CLEAR_ERRORS]: clearErrors,
});
