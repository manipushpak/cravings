import React from 'react';
import styles from '../../styles/Vendors/List.css'

import ListItem from './ListItem.jsx'

const List = props => {
   return(
      <div className={ styles.outerContainer }>
         {
            props.vendors.map(vendor => {
               return <ListItem 
                  name={vendor.name} 
                  location={vendor.location.address}
                  coordinates={vendor.location.coordinates}
                  keywords={vendor.keywords}
                  phone={vendor.phone}
                  open={vendor.open}
                  />
            })
         }
      </div>
   );
}

export default List;