import React from 'react';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
   return(
      <header>
         <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
            <Navbar.Brand>
               <Link to="/">Cravings</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="mr-auto">
                  <LinkContainer to="/about">
                     <Nav.Link eventKey={1}>About</Nav.Link>
                  </LinkContainer>
               </Nav>
               <Nav>
                  <LinkContainer to="/vendorportal">
                     <Nav.Link eventKey={3}>Vendor Portal</Nav.Link>
                  </LinkContainer>
               </Nav>
            </Navbar.Collapse>
         </Navbar> 
      </header>
   )
}

export default Header;