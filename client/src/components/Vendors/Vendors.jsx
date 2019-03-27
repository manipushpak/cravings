import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/Vendors.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactModal from 'react-modal';

import List from './List.jsx';
import ListModal from './ListModal.jsx';
import Map from './Map.jsx';

ReactModal.setAppElement("#App");

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      var vendors = typeof this.props.location.state !== 'undefined' && this.props.location.state.vendors !== null
      ? this.props.location.state.vendors : [];
      this.state = {
         vendors: [],
         showModal: false,
         vendorModal: null
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

   handleOpenModal(vendor) {
      this.setState({
         showModal: true,
         vendorModal: vendor
      });
   }

   handleCloseModal() {
      this.setState({ showModal: false });
   }

   render() {
      var headerStyle = classNames(styles.h1, global.h2);
      return(
         <div className={ styles.outerContainer } controlid='vendors'>
            <h2 className={ global.h2 }>Spots near you</h2>
            <br />
            <div className = { styles.filters }>
               <Form.Row>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Veg Options"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Open Now"} type="checkbox" />
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className = { styles.vendorColumn }>
               <List vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <ReactModal 
               isOpen={ this.state.showModal }
               onRequestClose={ this.handleCloseModal }
               overlayClassName={ modalStyles.modalOverlay }
               className={ modalStyles.modalContent }
            >
               <ListModal 
                  handleCloseModal={ this.handleCloseModal } 
                  vendor={ this.state.vendorModal }
               />
            </ReactModal>
         </div>
      );
   }
}

export default Vendors;