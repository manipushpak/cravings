import React from 'react';
import { PageHeader } from 'react-bootstrap';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <PageHeader>This is the registration page!</PageHeader>
         </div>
      );
   }
}

export default Registration;