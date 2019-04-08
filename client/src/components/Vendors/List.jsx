import React from 'react';
import styles from '../../styles/Vendors/List.css'

import ListItem from './ListItem.jsx'

const List = props => {
   return(
      <div className={ styles.outerContainer }>
         {
            props.vendors.map(vendor => {
               return <ListItem vendor={vendor} openModal={props.openModal} />
            })
         }
      </div>
   );
}

export default List;