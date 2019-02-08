import React from 'react';
import styles from '../styles/List.css'

import ListItem from './ListItem.jsx'

class List extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            {
               this.props.vendors.map(vendor => {
                  return <ListItem 
                     name={vendor.name} 
                     location={vendor.location.address}
                     coordinates={vendor.location.coordinates}
                     keywords={vendor.keywords}
                     phone={vendor.phone}
                     />
               })
            }
         </div>
      );
   }
}

export default List;