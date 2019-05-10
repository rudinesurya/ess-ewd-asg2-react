import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const Footer = () => (
  <Menu inverted fixed="bottom">
    <Container>
      <Menu.Item header>
        Waterford Institute of Technology MSc ESS EWD Assignment 2
      </Menu.Item>
      <Menu.Item>
        <a href="https://github.com/rudinesurya/ess-ewd-asg2-react">Link to GitHub</a>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Footer;
