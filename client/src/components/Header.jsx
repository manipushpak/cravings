import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return(
      <header>
         <nav>
            <div><Link to='/'>Home</Link></div>
            <div><Link to='/map'>Map</Link></div>
            <div><Link to='/search'>Search</Link></div>
         </nav>
      </header>
   )
}

export default Header;