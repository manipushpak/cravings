import React from 'react';

import { bubble as Menu } from 'react-burger-menu'

import { Link } from 'react-router-dom';

class About extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <h1>This is the about page!</h1>
         </div>
      );
   }
}

export default About;