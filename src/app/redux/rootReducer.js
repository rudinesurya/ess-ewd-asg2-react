import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './reducers/auth';
import errors from './reducers/errors';
import jobs from './reducers/jobs';

const rootReducer = combineReducers({
  auth,
  form: formReducer,
  errors,
  jobs,
});

export default rootReducer;
