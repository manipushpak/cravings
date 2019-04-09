import React from 'react';

import classNames from 'classnames';
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
      var bmStyles = {
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
            background: '#fcfcfc',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
         },
         bmMorphShape: {
            fill: '#fcfcfc'
         },
         bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
         },
         bmItem: {
            display: 'inline-block',
            padding: '15px 0px'
         },
         bmOverlay: {
            background: 'rgba(0, 0, 0, 0.2)'
         }
      }

      var menuItem = classNames("menu-item", styles.menuItem);

      return(
         <Menu right pageWrapId={ "bm-page-wrap" } outerContainerId={ "bm-outer-container" } styles={bmStyles} isOpen={this.state.isOpen} >
            <Link className={menuItem} onClick={this.onMenuItemClick} to="/">
               <span className={styles.menuItemIcon}><i className="fas fa-hamburger"></i></span>
               <span className={styles.menuItemText}>Cravings</span>
            </Link>
            <br />
            <Link className={menuItem} onClick={this.onMenuItemClick} to="/about">
               <i className="fas fa-drumstick-bite"></i><span className={styles.menuItemText}>About</span>
            </Link>
            <br />
            <Link className={menuItem} onClick={this.onMenuItemClick} to="/mission">
               <i className="fas fa-hotdog"></i><span className={styles.menuItemText}>Mission</span>
            </Link>
            <br />
            <Link className={menuItem} onClick={this.onMenuItemClick} to="/about">
               <i className="fas fa-pizza-slice"></i><span className={styles.menuItemText}>FAQ</span>
            </Link>
            <br />
            <Link className={menuItem} onClick={this.onMenuItemClick} to="/vendorportal">
               <i className="fas fa-cookie-bite"></i><span className={styles.menuItemText}>Portal</span>
            </Link>
         </Menu>
      );
   }
}

export default Header;