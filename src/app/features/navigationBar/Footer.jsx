import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const Footer = () => (
  <Menu inverted fixed="bottom">
    <Container>
      <Menu.Item header>
        Waterford Institute of Technology MSc ESS EWD Assignment 1
      </Menu.Item>
      <Menu.Item>
        <a href="https://github.com/rudinesurya/react-web-asg1">Link to GitHub</a>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Footer;
