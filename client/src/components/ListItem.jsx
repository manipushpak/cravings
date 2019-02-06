import React from 'react';
import styles from '../styles/ListItem.css';

class ListItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <h3>{this.props.name}</h3>
            <p>
               {this.props.location}
               <br />
               <span className={ this.props.open ? styles.storeOpen : styles.storeClosed }>
                  { this.props.open ? "open " : "closed " }
               </span>
                9:00 AM - 5:00 PM
            </p>
         </div>
      );
   }
}

export default ListItem;