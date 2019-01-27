import React from 'react';
import { PageHeader } from 'react-bootstrap';

class About extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <PageHeader>This is the about page!</PageHeader>
         </div>
      );
   }
}

export default About;