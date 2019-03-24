import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';

import Map from './Map.jsx';
import List from './List.jsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


class Vendors extends React.Component {
   constructor(props) {
      super(props);
      var vendors = typeof this.props.location.state !== 'undefined' && this.props.location.state.vendors !== null
      ? this.props.location.state.vendors : [];
      this.state = {
         vendors: vendors
      };
   }


   render() {
      return(
         <div className={ styles.outerContainer }>
            <h1 className={styles.h1}>Spots near you</h1> <br />
            <div className = {styles.filters}>
               <Form.Row>
                  <Form.Group as={Col} xs={6} sm={2}>
                     <Form.Check label={"Vegetarian"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={2}>
                     <Form.Check label={"Open Now"} type="checkbox" />
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className = {styles.vendorList}>
               <List vendors={ this.state.vendors } />
            </div>
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors }/>
            </div>
         </div>
      );
   }
}

export default Vendors;