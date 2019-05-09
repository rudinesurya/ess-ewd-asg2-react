import PropTypes from 'prop-types';
import React from 'react';
import { Menu } from 'semantic-ui-react';


/**
 * Component for rendering Menu when User is Logged Out
 *
 * @param login
 * @param register
 * @returns {*}
 * @constructor
 */
const LoggedOutMenu = ({ login, register }) => (
  <Menu.Menu position="right">
    <Menu.Item onClick={login} name="Login"/>
    <Menu.Item onClick={register} name="Register"/>
  </Menu.Menu>

);

LoggedOutMenu.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default LoggedOutMenu;
