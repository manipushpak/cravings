import React from 'react';
import styles from './../styles/Main.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import About from './About/About.jsx';
import Vendors from './Vendors/Vendors.jsx';
import Registration from './Registration/Registration.jsx';
import UserLogInSignUp from './UserLogInSignUp.jsx';

const Main = () => {
   return(
      <main className={ styles.outerContainer }>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/vendors' component={Vendors}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/userloginsignup' component={UserLogInSignUp}/>
         </Switch>
      </main>
   )
}

export default Main;