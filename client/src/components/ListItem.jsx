import React from 'react';
import styles from '../styles/ListItem.css';

class ListItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = { open: true};
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.vendorLogo }>
               <span className={ this.props.open ? styles.storeOpen : styles.storeClosed }></span>
            </div>
            <div className={ styles.vendorInfo }>
                <h3>{this.props.name}</h3>
                <p>{this.props.address}</p>
            </div>   
         </div>
      );
   }
}

export default ListItem;