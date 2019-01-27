import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => {
   return(
      <header>
         <Navbar collapseOnSelect>
            <Navbar.Header>
               <Navbar.Brand>
                  <Link to="/">Cravings</Link>
               </Navbar.Brand>
               <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
               <Nav>
                  <LinkContainer to="/about">
                     <NavItem eventKey={1}>About</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/vendors">
                     <NavItem eventKey={2}>Vendors</NavItem>
                  </LinkContainer>
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </header>
   )
}

export default Header;