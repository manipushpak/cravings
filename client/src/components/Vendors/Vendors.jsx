import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import Col from 'react-bootstrap/Col';
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
         showModal: false,
         modalInfo: {
            name: '',
            address: '',
            hours: ''
         }
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

   handleOpenModal(name, address, hours) {
      this.setState({
         showModal: true,
         modalInfo: {
            name: name,
            address: address,
            hours: hours
         }
      });
   }

   handleCloseModal() {
      this.setState({showModal: false});
   }

   render() {
      return(
         <div className={ styles.outerContainer } controlId='vendors'>
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
            <div className = {styles.vendorColumn}>
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
               <ListModal 
                  handleCloseModal={ this.handleCloseModal } 
                  name={ this.state.modalInfo.name }
                  address={ this.state.modalInfo.address }
                  hours={ this.state.modalInfo.hours }
               />
            </ReactModal>
         </div>
      );
   }
}

export default Vendors;