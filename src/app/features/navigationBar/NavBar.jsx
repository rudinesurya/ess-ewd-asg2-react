import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedInMenu from './menu/LoggedInMenu';
import LoggedOutMenu from './menu/LoggedOutMenu';
import { logoutUser } from '../../redux/actions/auth';

/**
 * Component for rendering the header navigation bar
 */
class NavBar extends Component {
  loginHandler = () => {
    const { history } = this.props;
    history.push('/login');
  };

  registerHandler = () => {
    const { history } = this.props;
    history.push('/register');
  };

  logoutHandler = async () => {
    const { history, logoutUser } = this.props;
    await logoutUser();
    history.push('/login');
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.isAuthenticated;

    return (
      <Menu inverted fixed="top" size="massive">
        <Container>
          <Menu.Item header> Fast Jobs</Menu.Item>
          <Menu.Item as={NavLink} to="/jobs" name="Jobs" />
          {authenticated && <Menu.Item as={Link} to="/createJob" name="Create Job" />}


          {authenticated ? <LoggedInMenu auth={auth} logout={this.logoutHandler} />
            : <LoggedOutMenu login={this.loginHandler} register={this.registerHandler} />}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
