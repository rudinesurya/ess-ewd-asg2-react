import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import LoggedInMenu from './menu/LoggedInMenu';
import LoggedOutMenu from './menu/LoggedOutMenu';

/**
 * Component for rendering the header navigation bar
 */
class NavBar extends Component {
  loginHandler = () => {
    const { history } = this.props;
    history.push('/login');
  };

  registerHandler = () => {

  };

  logoutHandler = () => {

  };

  render() {
    const authed = false;

    return (
      <Menu inverted fixed="top" size="massive">
        <Container>
          <Menu.Item header> Fast Jobs</Menu.Item>
          <Menu.Item as={NavLink} to="/jobs" name="Jobs"/>
          {authed && <Menu.Item as={Link} to="/createJob" name="Create Job"/>}


          {authed ? <LoggedInMenu logout={this.logoutHandler}/>
            : <LoggedOutMenu login={this.loginHandler} register={this.registerHandler}/>}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
