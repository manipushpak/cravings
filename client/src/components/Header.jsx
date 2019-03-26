import React from 'react';

import styles from '../styles/Header.css';

import { elastic as Menu } from 'react-burger-menu';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
   constructor(props) {
      super(props);
      this.state = { isOpen: false };

      this.onMenuItemClick = this.onMenuItemClick.bind(this);
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
            top: '36px',
            right: '36px'
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
            background: '#FAFAFA',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
         },
         bmMorphShape: {
            fill: '#FAFAFA'
         },
         bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
         },
         bmItem: {
            display: 'inline-block',
            padding: '10px 0px'
         },
         bmOverlay: {
            background: 'rgba(0, 0, 0, 0.2)'
         }
       }

      return(
         <Menu right  pageWrapId={ "bm-page-wrap" } outerContainerId={ "bm-outer-container" } styles={styles} isOpen={this.state.isOpen} >
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/">
               <i className="fas fa-hamburger"></i><span>Cravings</span>
            </Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">
               <i className="fas fa-drumstick-bite"></i><span>About</span>
            </Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">
               <i className="fas fa-hotdog"></i><span>Mission</span>
            </Link>
            <br />
            <Link className="menu-item" onClick={this.onMenuItemClick} to="/about">
               <i className="fas fa-pizza-slice"></i><span>FAQ</span>
            </Link>
            <br />
            <Link className="menu-item--small" onClick={this.onMenuItemClick} to="/vendorportal">
               <i className="fas fa-cookie-bite"></i><span>Portal</span>
            </Link>
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