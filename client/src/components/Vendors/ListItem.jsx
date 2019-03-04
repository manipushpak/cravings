import React from 'react';
import styles from '../../styles/Vendors/ListItem.css';

const ListItem = props => {
   var vendor = props.vendor;

   return(
      <div className={ styles.outerContainer } onClick = { () => props.openModal(vendor.name, vendor.location.address, "9:00 AM - 5:00 PM") }>
         <h3>{vendor.name}</h3>
         <p>
            {vendor.location.address}
            <br />
            <span className={ vendor.open ? styles.storeOpen : styles.storeClosed }>
               { vendor.open ? "open " : "closed " }
            </span>
               9:00 AM - 5:00 PM
         </p>
      </div>
   );
}

export default ListItem;