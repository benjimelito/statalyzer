import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

const NavBar = (props) => {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Statalyzer</a>
        </Navbar.Brand>
        </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
      </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;