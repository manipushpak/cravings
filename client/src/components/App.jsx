import React from 'react';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

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
            <Footer />
         </div>
      );
   }
}

export default App;