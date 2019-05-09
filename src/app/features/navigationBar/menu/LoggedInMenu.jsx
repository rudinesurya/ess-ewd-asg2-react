import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';


/**
 * Component for rendering Menu when User is Logged In
 *
 * @param logout
 * @param auth
 * @param profile
 * @returns {*}
 * @constructor
 */
const LoggedInMenu = ({ logout }) => {
  const profile = {
    _id: '123',
    avatarUrl: '',
    displayName: 'John Doe',
  };

  const { _id, avatarUrl, displayName } = profile;

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={avatarUrl}/>
      <Dropdown pointing="top left" text={displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/profile/${_id}`} text="My Profile"/>
          <Dropdown.Item onClick={logout} text="Log out"/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

LoggedInMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default LoggedInMenu;
