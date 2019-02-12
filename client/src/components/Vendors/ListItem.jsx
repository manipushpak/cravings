import React from 'react';
import styles from '../styles/ListItem.css';

const ListItem = props => {
   return(
      <div className={ styles.outerContainer }>
         <h3>{props.name}</h3>
         <p>
            {props.location}
            <br />
            <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
               { props.open ? "open " : "closed " }
            </span>
               9:00 AM - 5:00 PM
         </p>
      </div>
   );
}

export default ListItem;