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
         {/* <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
               <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="active">
                     <a class="scroll nav-link">
                        <Link to='/'>Home</Link>
                     </a>
                  </li>
                  <li class="">
                     <a class="scroll nav-link">
                        <Link to='/map'>Map</Link>
                     </a>               
                  </li>

               </ul> 
            </div>
         </nav> */}
      </header>
   )
}

export default Header;