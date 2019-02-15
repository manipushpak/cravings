import React from 'react';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
   return(
      <header>
         <Navbar collapseOnSelect expand="lg" bg="light">
            <Navbar.Brand>
               <Link to="/">Cravings</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="mr-auto">
                  <LinkContainer to="/about">
                     <Nav.Link eventKey={1}>About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/vendors">
                     <Nav.Link eventKey={2}>Vendors</Nav.Link>
                  </LinkContainer>
               </Nav>
               <Nav>
                  <LinkContainer to="/registration">
                     <Nav.Link eventKey={3}>Registration</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/userloginsignup">
                     <Nav.Link eventKey={4}>Login</Nav.Link>
                  </LinkContainer>
               </Nav>
            </Navbar.Collapse>
         </Navbar> 
      </header>
   )
}

export default Header;