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
   }

   componentDidMount() {
      fetch('/vendors')
      .then(res => res.json())
      .then(vendors => {
         this.setState({ vendors })
      })
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.searchBar }>
               <InputGroup>
                  <Form.Control size="lg" placeholder="What are you looking for?" />
                  <DropdownButton as={InputGroup.Append} variant="outline-secondary" alignRight>
                     <DropdownItem>Search All</DropdownItem>
                     <Dropdown.Divider />
                     <Dropdown.Header>Filters</Dropdown.Header>
                     <Dropdown.Item>Stall Name</Dropdown.Item>
                     <Dropdown.Item>Keywords</Dropdown.Item>
                  </DropdownButton>
               </InputGroup>
            </div>
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