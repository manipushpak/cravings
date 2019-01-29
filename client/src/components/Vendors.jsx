import React from 'react';
import styles from '../styles/Vendors.css';

import List from './List.jsx';
import Map from './Map.jsx';

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.searchBar }>
               Search Bar Here
            </div>
            <div className={ styles.listColumn }>
               <List />
            </div>
            <div className={ styles.mapColumn }>
               <Map />
            </div>
         </div>
      );
   }
}

export default Vendors;