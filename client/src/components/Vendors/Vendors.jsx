import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';

import Map from './Map.jsx';
import List from './List.jsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


class Vendors extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         vendors: []
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
   }

   componentDidMount() {
      fetch('/vendors')
      .then(res => res.json())
      .then(vendors => {
         this.setState({ vendors })
      })
   }

   handleInputChange(e) {
      var searchTerm = e.target.value;
      if(searchTerm == ""){
         fetch('/vendors')
         .then(res => res.json())
         .then(vendors => {
            this.setState({ vendors })
         })
      }
      else{
         fetch('/vendor/name/'+searchTerm, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
         })
         .then(res => res.json())
         .then(vendors => {
            if(vendors != null){
               this.setState({ vendors })
            }
         })
      }
    }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <h1 className={styles.h1}>Spots near you</h1> <br />
            <div className = {styles.filters}>
               <Form.Row>
                  <Form.Group as={Col} xs={6} sm={2}>
                     <Form.Check label={"Veg Options"} type="checkbox" />
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