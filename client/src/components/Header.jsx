import React from 'react';

import { bubble as Menu } from 'react-burger-menu'

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
   constructor(props) {
      super(props);
      this.state = { isOpen: false };

      this.onMenuItemClick.bind(this);
   }

   onMenuItemClick() {
      this.setState({ isOpen: false });
   }

   render() {
      var styles = {
         bmBurgerButton: {
            position: 'absolute',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
         },
         bmBurgerBars: {
            background: '#e04d05',
            borderRadius: '10px',
            height: '4px'
         },
         bmBurgerBarsHover: {
            background: '#373a47'
         },
         bmCrossButton: {
            width: '24px',
            height: '24px'
         },
         bmCross: {
            borderRadius: '10px',
            background: '#bdc3c7'
         },
         bmMenuWrap: {
            position: 'fixed',
            height: '100%'
         },
         bmMenu: {
            background: '#fff',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
         },
         bmMorphShape: {
            fill: '#fff'
         },
         bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
         },
         bmItem: {
            display: 'inline-block'
         },
         bmOverlay: {
            background: 'rgba(0, 0, 0, 0.2)'
         }
       }

      return(
         <Menu styles={styles} isOpen={this.state.isOpen} >
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/">Cravings</Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">About</Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">Mission</Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">FAQ</Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/vendorportal">Vendor Portal</Link>
         </Menu>
       
         // <header>
         //    <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
         //       <Navbar.Brand>
         //          <Link to="/">Cravings</Link>
         //       </Navbar.Brand>
         //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         //       <Navbar.Collapse id="responsive-navbar-nav">
         //          <Nav className="mr-auto">
         //             <LinkContainer to="/about">
         //                <Nav.Link eventKey={1}>About</Nav.Link>
         //             </LinkContainer>
         //          </Nav>
         //          <Nav>
         //             <LinkContainer to="/vendorportal">
         //                <Nav.Link eventKey={3}>Vendor Portal</Nav.Link>
         //             </LinkContainer>
         //          </Nav>
         //       </Navbar.Collapse>
         //    </Navbar> 
         // </header>
         
      );
   }
}

export default Header;