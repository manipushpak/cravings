import React from 'react';
import styles from './../styles/Main.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import About from './About/About.jsx';
import Vendors from './Vendors/Vendors.jsx';
import VendorPortal from './Registration/VendorPortal.jsx';
import UserLogInSignUp from './UserLogInSignUp/UserLogInSignUp.jsx';

const Main = () => {
   return(
      <main className={ styles.outerContainer }>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/vendors' component={Vendors}/>
            <Route path='/vendorportal' component={VendorPortal}/>
            <Route path='/userloginsignup' component={UserLogInSignUp}/>
         </Switch>
      </main>
   )
}

export default Main;