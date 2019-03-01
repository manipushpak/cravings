import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import List from './List.jsx';
import Map from './Map.jsx';
import DropdownItem from 'react-bootstrap/DropdownItem';

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
            <h1 className={styles.h1}>Spots near you</h1>
            <div className={ styles.listColumn }>
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