import React from 'react';
import styles from '../../styles/Vendors.css';

import List from './List.jsx';
import Map from './Map.jsx';

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         vendors: []
      };
   }

   componentDidMount() {
      fetch('/vendors')
      .then(res => res.json())
      .then(vendors => {
         this.setState({ vendors })
      })
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.searchBar }>
               Search Bar Here
            </div>
            <div className={ styles.listColumn }>
               <List vendors={ this.state.vendors } />
            </div>
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors }/>
            </div>
         </div>
      );
   }
}

export default Vendors;