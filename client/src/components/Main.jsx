import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx'
import MyMapComponent from './Map.jsx'
import Map from './Map.jsx'

const Main = () => {
   return(
      <main>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/map' component={Map}/>
         </Switch>
      </main>
   )
}

export default Main;