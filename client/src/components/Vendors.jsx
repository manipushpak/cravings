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
      const vendorsList = [
         {
            name: "Sophia's Tacos",
            location: "Taco Street",
            open: true,
         },
         {
            name: "Devikas Cakes",
            location: "Cake Blvd.",
            open: false,
         },
         {
            name: "Mani's Sushi",
            location: "Sushi Lane",
            open: false,
         },
         {
            name: "Sonali's Lemonade",
            location: "Lemonade & Brownies",
            open: true,
         },
      ];

      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.searchBar }>
               Search Bar Here
            </div>
            <div className={ styles.listColumn }>
               <List vendors={[
                  {
                     name: "Sophia's Tacos",
                     location: "Taco Street",
                     open: true,
                  },
                  {
                     name: "Devikas Cakes",
                     location: "Cake Blvd.",
                     open: false,
                  },
                  {
                     name: "Mani's Sushi",
                     location: "Sushi Lane",
                     open: false,
                  },
                  {
                     name: "Sonali's Lemonade",
                     location: "Lemonade & Brownies",
                     open: true,
                  },
                  {
                     name: "Sophia's Tacos",
                     location: "Taco Street",
                     open: true,
                  },
                  {
                     name: "Devikas Cakes",
                     location: "Cake Blvd.",
                     open: false,
                  },
                  {
                     name: "Mani's Sushi",
                     location: "Sushi Lane",
                     open: false,
                  },
                  {
                     name: "Sonali's Lemonade",
                     location: "Lemonade & Brownies",
                     open: true,
                  }
               ]} />
            </div>
            <div className={ styles.mapColumn }>
               <Map />
            </div>
         </div>
      );
   }
}

export default Vendors;