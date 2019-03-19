import React from 'react';
import styles from './../styles/Main.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import About from './About/About.jsx';
import Registration from './Registration/Registration.jsx';
import UserLogInSignUp from './UserLogInSignUp/UserLogInSignUp.jsx';
import Vendors from './Vendors/Vendors.jsx';
import VendorPortal from './Registration/VendorPortal.jsx';
import VendorSignUp from './Registration/VendorSignUp.jsx';


const Main = () => {
   return(
      <main className={ styles.outerContainer }>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/vendors' component={Vendors}/>
            <Route exact path='/vendorportal' component={VendorPortal}/>
            <Route path={'/vendorportal/register'} render={() => <Registration isEdit={false} isView={false}/>} />
            <Route path={'/vendorportal/account'} render={() => <Registration isEdit={false} isView={true}/>} />
            <Route path='/userloginsignup' component={UserLogInSignUp}/>
            <Route path='/vendorsignup' component={VendorSignUp}/>
         </Switch>
      </main>
   )
}

export default Main;