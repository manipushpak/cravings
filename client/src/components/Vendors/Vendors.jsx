import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/Vendors.css';
import appStyles from '../../styles/App.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import Map from './Map.jsx';
import List from './List.jsx';
import ListItem from './ListItem.jsx';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ReactModal from 'react-modal';
import ListModal from './ListModal.jsx';

import ScrollMenu from 'react-horizontal-scrolling-menu';

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
         vendorModal: null
      };
      this.didProvideLocation = this.didProvideLocation.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
   }

   didProvideLocation() {
      var self = this;      
      // document.getElementById("userLocationText").innerHTML = "Detecting current location...";
      
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
            // document.getElementById("userLocationText").innerHTML = "Detecting current location...";document.getElementById("userLocationText").innerHTML = "Current location cannot be detected. Please try again or type in your street address.";
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
      this.didProvideLocation();

      const Menu = (list) => {
         list.map(vendor => {
            return <ListItem 
               key={ vendor.vendorInfo.stallName }
               vendorInfo={vendor.vendorInfo}
               openModal={this.handleOpenModal}
               />
         });
      }; 
      
      const Arrow = ({ text, className }) => {
         return (
            <div className={className}>{text}</div>
         );
      };
       
      const ArrowLeft = Arrow({ text: '<', className: appStyles.arrowPrev });
      const ArrowRight = Arrow({ text: '>', className: appStyles.arrowNext });
      const menu = Menu(this.state.vendors);
      
      return(
         <div className={ styles.outerContainer } controlid='vendors'>
            <h2 className={ global.h2 }>Spots near you</h2>
            <br />
            <div className = { styles.filters }>
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
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors } openModal={ this.handleOpenModal } />
            </div>
            <div className={ styles.searchColumn }>
               <InputGroup className={ styles.searchBar }>
                  <Form.Control className={ styles.searchInput } id="searchTerm" onChange={e => this.handleChange(e)}/>
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