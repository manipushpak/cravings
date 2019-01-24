import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx'
import MyMapComponent from './Map.jsx'
import Search from './Search.jsx'

const Main = () => {
   return(
      <main>
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/search' component={Search}/>
         </Switch>
      </main>
   )
}

export default Main;