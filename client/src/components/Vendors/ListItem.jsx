import React from 'react';
import styles from '../../styles/Vendors/ListItem.css';


const ListItem = props => {
   return(
      <div className={ styles.outerContainer }>
         <img className = {styles.img} src={require('./taco.jpg')}  alt="No image"></img>
         <br />
         <h3 className ={styles.h3}>{props.name}</h3>
      </div>
   );
}

export default ListItem;