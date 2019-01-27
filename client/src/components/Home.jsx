import React from 'react';
import { PageHeader } from 'react-bootstrap';

class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <PageHeader>This is the homepage!</PageHeader>
         </div>
      );
   }
}

export default Home;