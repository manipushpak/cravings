import React from 'react';

import global from '../styles/Global.css';

import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   
   render() {
      return(
         <div id="bm-outer-container" className={ global.outerContainer }>
            <Header />
            <Main />
         </div>
      );
   }
}

export default App;