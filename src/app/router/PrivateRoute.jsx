import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authed
        ? <Component {...props} />
        : <Redirect to="/"/>
    )}
  />
);

export default PrivateRoute;
