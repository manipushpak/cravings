import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/Vendors.css';
import modalStyles from '../../styles/Vendors/ListModal.css';

import FilterSlider from './FilterSlider.jsx';
import Map from './Map.jsx';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ReactModal from 'react-modal';
import ListModal from './ListModal.jsx';
import SearchList from './SearchList.jsx';

ReactModal.setAppElement("#App");

class Vendors extends React.Component {
   constructor(props) {
      super(props);
      var vendors = typeof this.props.location.state !== 'undefined' && this.props.location.state.vendors !== null
      ? this.props.location.state.vendors : [];
      var searchTerm = this.props.location.state.searchTerm;
      this.state = {
         vendors: vendors.vendors,
         locationProvided: false,
         userLat: "",
         userLong: "",
         showInfo: false,
         vendorInfo: null,
         searchTerm: searchTerm,
         searchTerms:[searchTerm]
      };
      this.didProvideLocation = this.didProvideLocation.bind(this);
      this.handleShowInfo = this.handleShowInfo.bind(this);
      this.handleHideInfo = this.handleHideInfo.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
      this.deleteSearchTerm = this.deleteSearchTerm.bind(this);
   }

   handleSearchTermChange(e){
      this.setState({
         searchTerm: e.target.value
      });
   }

   handleSearch() {
      var searchTerm = this.state.searchTerm;
      var terms = this.state.searchTerms;
      document.getElementById("searchTerm").value = "";
      terms.push(searchTerm);
      this.setState({
         searchTerms: terms
      })
      fetch('/search', {
         method: 'POST',
         body: JSON.stringify({
            terms: terms
         }),
         headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(vendors => {
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
   
   handleShowInfo(vendor) {
      this.setState({
         showInfo: true,
         vendorInfo: vendor
      });
   }

   handleHideInfo() {
      this.setState({ showInfo: false });
   }

   deleteSearchTerm(searchTerm) {
      var terms = this.state.searchTerms;
      for( var i = 0; i < terms.length; i++){
         if ( terms[i] === searchTerm) {
            terms.splice(i, 1);
         }
      }
      this.setState({
         searchTerms: terms
      })
      this.handleSearch;
   }

   render() { 
      return(
         <div controlid='vendors'>
            <h1 className={ global.h2 }>Spots near you</h1>
            <br />
            <div className={ styles.filters }>
               <Form.Row>
                  <Form.Group as={Col} xs={12} md={6}>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Vegetarian"} type="checkbox" />
                     </Form.Group>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Open Now"} type="checkbox" />
                     </Form.Group>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Gluten Free"} type="checkbox" />
                     </Form.Group>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Dairy Free"} type="checkbox" />
                     </Form.Group>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Kosher"} type="checkbox" />
                     </Form.Group>
                     <Form.Group xs={6} md={4}>
                        <Form.Check inline label={"Halal"} type="checkbox" />
                     </Form.Group>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                     <FilterSlider />
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className={ classNames(styles.outerContainer, global.floatingWindow) }>
               <div className={ styles.mapColumn }>
                  <Map vendors={ this.state.vendors } openModal={ this.handleShowInfo } />
               </div>
               <div className={ styles.searchColumn }>
                  <InputGroup className={ styles.searchBar }>
                     <InputGroup.Prepend>
                        <Button type="submit" className={ styles.searchButton } onClick={this.handleSearch} variant="outline">
                           <i className="fa fa-search"></i>
                        </Button>
                     </InputGroup.Prepend>
                     <Form.Control className={ styles.searchInput } id="searchTerm" onChange={e => this.handleSearchTermChange(e)} />
                  </InputGroup>
                  <div className={ styles.infoDiv }>
                     {
                        this.state.showInfo &&
                        <ListModal 
                           handleHideInfo={ this.handleHideInfo } 
                           vendor={ this.state.vendorInfo }
                        />
                     }
                  </div>
                  <div className={ styles.searchListDiv }>
                     <SearchList searchTerms={this.state.searchTerms} deleteSearchTerm={this.deleteSearchTerm}></SearchList>
                  </div>
               </div>
            </div>
            <ReactModal 
               isOpen={ this.state.showModal }
               onRequestClose={ this.handleCloseModal }
               overlayClassName={ modalStyles.modalOverlay }
               className={ modalStyles.modalContent }
               >
            </ReactModal>
         </div>
      );
   }
}

export default Vendors;