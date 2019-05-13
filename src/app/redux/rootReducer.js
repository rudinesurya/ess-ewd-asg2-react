import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './reducers/auth';
import profile from './reducers/profile';
import job from './reducers/job';

const rootReducer = combineReducers({
  auth,
  form: formReducer,
  profile,
  job,
});

export default rootReducer;
