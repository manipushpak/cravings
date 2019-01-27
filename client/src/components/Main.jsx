import React from 'react';
import styles from './../styles/Main.css';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx'
import About from './About.jsx'
import Vendors from './Vendors.jsx'

const Main = () => {
   return(
      <main className={ styles.outerContainer }>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/vendors' component={Vendors}/>
         </Switch>
      </main>
   )
}

export default Main;