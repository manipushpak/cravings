import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactModal from 'react-modal';

import List from './List.jsx';
import ListModal from './ListModal.jsx';
import Map from './Map.jsx';

ReactModal.setAppElement("#App");

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         vendors: [],
         showModal: false
      };
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
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

   handleOpenModal() {
      this.setState({showModal: true});
   }

   handleCloseModal() {
      this.setState({showModal: false});
   }

   render() {
      return(
         <div className={ styles.outerContainer } controlId='vendors'>
            <div className={ styles.searchBar }>
               <Button onClick={this.handleOpenModal}>boop.</Button>
               <InputGroup>
                  <Form.Control controlId="searchTerm" size="lg" placeholder="What are you looking for?" onChange={e => this.handleInputChange(e)}/>
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
               <List vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <ReactModal 
               isOpen={this.state.showModal}
               onRequestClose={this.handleCloseModal}
               overlayClassName={modalStyles.modalOverlay}
               className={modalStyles.modalContent}
            >
               <ListModal handleCloseModal={ this.handleCloseModal } />
            </ReactModal>
         </div>
      );
   }
}

export default Vendors;