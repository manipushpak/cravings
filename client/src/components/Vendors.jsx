import React from 'react';
import styles from '../styles/Vendors.css';

import List from './List.jsx';
import Map from './Map.jsx';

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         vendors: []
      };
   }

   // getVendors = () => {
   //    fetch('/vendors')
   //    .then(res => res.json())
   //    .then(vendors => this.setState({ vendors }))
   // }

   render() {
      const vendorsList = [
         {
            name: "Sophia's Tacos",
            location: "Taco Street",
            coords: {
               lat: 34.0254,
               lng: -118.2852
            },
            open: true,
         },
         {
            name: "Devika's Cakes",
            location: "Cake Blvd.",
            coords: {
               lat: 34.0141,
               lng: -118.2879
            },
            open: false,
         },
         {
            name: "Mani's Sushi",
            location: "Sushi Lane",
            coords: {
               lat: 34.0224,
               lng: -118.2851
            },
            open: false,
         },
         {
            name: "Sonali's Lemonade",
            location: "Lemonade & Brownies",
            coords: {
               lat: 34.0232,
               lng: -118.2801
            },
            open: true,
         },
      ];

      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.searchBar }>
               Search Bar Here
            </div>
            <div className={ styles.listColumn }>
               <List vendors={ vendorsList } />
            </div>
            <div className={ styles.mapColumn }>
               <Map vendors={ vendorsList }/>
            </div>
         </div>
      );
   }
}

export default Vendors;