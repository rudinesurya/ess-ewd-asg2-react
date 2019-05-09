import { Redirect, Route, Switch, withRouter } from 'react-router';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../utils/ErrorPage';
import LoginPage from '../features/loginPage/LoginPage';
import RegistrationPage from '../features/registrationPage/RegistrationPage';
import JobDashboard from '../features/jobDashboard/JobDashboard';
import JobDetailPage from '../features/jobDetailPage/JobDetailPage';
import EditProfilePage from '../features/profilePage/EditProfilePage';
import ProfilePage from '../features/profilePage/ProfilePage';
import JobRegistrationPage from '../features/jobRegistration/JobRegistrationPage';

const Router = () => {
  const authed = false;

  return (
    <Switch>
      <Redirect exact from="/" to="/jobs"/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegistrationPage}/>
      <Route path="/jobs" component={JobDashboard}/>
      <Route path="/job/:id" component={JobDetailPage}/>
      <PrivateRoute path="/updateJob/:id" authed={authed} component={JobRegistrationPage}/>
      <PrivateRoute path="/createJob" authed={authed} component={JobRegistrationPage}/>
      <PrivateRoute path="/editProfile/:id" authed={authed} component={EditProfilePage}/>
      <Route path="/profile/:id" component={ProfilePage}/>
      <Route path="/error" component={ErrorPage}/>
      <Route component={JobDashboard}/>
    </Switch>
  );
};

export default withRouter(Router);
