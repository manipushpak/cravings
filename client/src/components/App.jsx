import React from 'react';

import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   
   render() {
      return(
         <div>
            <Header />
            <Main />
         </div>
      );
   }
}

export default App;