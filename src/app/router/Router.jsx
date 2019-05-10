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

const Router = () => (
  <Switch>
    <Redirect exact from="/" to="/jobs" />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegistrationPage} />
    <Route exact path="/jobs" component={JobDashboard} />
    <Route exact path="/job/:id" component={JobDetailPage} />
    <PrivateRoute exact path="/updateJob/:id" component={JobRegistrationPage} />
    <PrivateRoute exact path="/createJob" component={JobRegistrationPage} />
    <PrivateRoute exact path="/editProfile/:id" component={EditProfilePage} />
    <Route exact path="/profile/:id" component={ProfilePage} />
    <Route exact path="/error" component={ErrorPage} />
    <Route component={JobDashboard} />
  </Switch>
);

export default withRouter(Router);
