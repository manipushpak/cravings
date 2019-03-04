import React from 'react';
import styles from '../../styles/Vendors/ListItem.css';

const ListItem = props => {
   var vendor = props.vendor;

   return(
      <div className={ styles.outerContainer } onClick = { props.openModal }>
         <div className={styles.greyBox}></div>
         <br />
         <h3 className ={styles.h3}>{props.name}</h3>
      </div>
   );
}

export default ListItem;