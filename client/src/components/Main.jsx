import React from 'react';

import styles from '../styles/Main.css';

import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import About from './About/About.jsx';
import Mission from './Mission/Mission.jsx';
import Faq from './Faq/Faq.jsx';
import Registration from './Registration/Registration.jsx';
import Vendors from './Vendors/Vendors.jsx';
import VendorPortal from './Registration/VendorPortal.jsx';


const Main = () => {
   return(
      <main id="bm-page-wrap" className={ styles.outerContainer }>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/mission' component={Mission}/>
            <Route path='/faq' component={Faq}/>
            <Route path='/vendors' component={Vendors}/>
            <Route path='/vendorportal' component={VendorPortal}/>
            <Route path='/register' render={() => <Registration isEdit={false} isView={false}/>} />
            <Route path='/account' render={() => <Registration isEdit={false} isView={true}/>} />
         </Switch>
      </main>
   )
}

export default Main;