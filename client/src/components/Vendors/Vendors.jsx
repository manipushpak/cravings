import React from 'react';

import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/Vendors.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import Map from './Map.jsx';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ReactModal from 'react-modal';
import ListModal from './ListModal.jsx';

ReactModal.setAppElement("#App");

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      var vendors = typeof this.props.location.state !== 'undefined' && this.props.location.state.vendors !== null
      ? this.props.location.state.vendors : [];
      this.state = {
         vendors: vendors.vendors,
         locationProvided: false,
         userLat: "",
         userLong: "",
         showModal: false,
         vendorModal: null,
         searchTerm: ""
      };
      this.didProvideLocation = this.didProvideLocation.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
   }

   handleSearchTermChange(e){
      this.setState({
         searchTerm: e.target.value
      });
   }

   handleSearch() {
      var searchTerm = this.state.searchTerm;
      console.log("searchterm: " + searchTerm);

      fetch('/search/'+searchTerm, {
         headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
      .then(res => res.json())
      .then(vendors => {
         console.log(vendors);
         this.setState({
            vendors: vendors.vendors
         });
      })
   }

   didProvideLocation() {
      var self = this;      
      
      navigator.geolocation.getCurrentPosition(
         position => {
            const { latitude, longitude } = position.coords;
            self.setState({
               locationProvided: true,
               userLat: latitude,
               userLong: longitude
            })
         },
         () => {
            self.setState({
               locationProvided: false
            })
         }
      );
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
      return(
         <div className={ styles.outerContainer } controlid='vendors'>
            <h2 className={ global.h2 }>Spots near you</h2>
            <br />
            <div className={ styles.filters }>
               <Form.Row>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Vegetarian"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Open Now"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Gluten Free"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Dairy Free"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Kosher"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={3} md={2}>
                     <Form.Check label={"Halal"} type="checkbox" />
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <div className={ styles.searchColumn }>
               <InputGroup className={ styles.searchBar }>
                  <Form.Control className={ styles.searchInput } id="searchTerm" onChange={e => this.handleSearchTermChange(e)} />
                  <InputGroup.Append>
                     <Button type="submit" className={ styles.searchButton } onClick={this.handleSearch} variant="outline-secondary">
                        <i className="fa fa-search"></i>
                     </Button>
                  </InputGroup.Append>
               </InputGroup>
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

// const ArrowLeft = Arrow({ text: '<', className: appStyles.arrowPrev });
// const ArrowRight = Arrow({ text: '>', className: appStyles.arrowNext });
// const menu = Menu(this.state.vendors);
{/* <div className = {styles.vendorList}>
   <h3 className={styles.h3}>Less than 5 min walk away</h3>
   <ScrollMenu
      data={menu}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
   /> <br />
   <h3 className={styles.h3}>Less than 10 min walk away</h3>
   <ScrollMenu
      data={menu}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
   /> <br />
   <h3 className={styles.h3}>Uber ride away</h3>
   <ScrollMenu
      data={menu}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
   />
</div> */}