import React from 'react';
import styles from '../styles/Vendors.css';

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
                Search
            </div>
            <div className={ styles.listColumn }>
                List
            </div>
            <div className={ styles.mapColumn }>
                <Map />
            </div>
         </div>
      );
   }
}

export default Vendors;