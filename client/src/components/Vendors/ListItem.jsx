import React from 'react';
import styles from '../../styles/Vendors/ListItem.css';

const ListItem = props => {
   return(
      <div 
         className={ styles.outerContainer } 
         onClick = { () => props.openModal(props.vendor.name, props.vendor.location.address, "9:00 AM - 5:00 PM") }
      >
         <div className={styles.greyBox}></div>
         <br />
         <h3 className ={styles.h3}>{props.vendor.name}</h3>
      </div>
   );
}

export default ListItem;