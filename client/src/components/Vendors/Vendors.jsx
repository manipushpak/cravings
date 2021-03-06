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
         distance: [30],
         locationProvided: false,
         userLat: "",
         userLong: "",
         showInfo: false,
         vendorInfo: null,
         searchTerm: searchTerm,
         searchTerms:[searchTerm],
         filterArray: []
      };
      this.didProvideLocation = this.didProvideLocation.bind(this);
      this.handleShowInfo = this.handleShowInfo.bind(this);
      this.handleHideInfo = this.handleHideInfo.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.deleteSearchTerm = this.deleteSearchTerm.bind(this);
      this.updateDistance = this.updateDistance.bind(this);
   }

   handleFilter(e){
      var filterArray = this.state.filterArray;
      var index = 0;
      if (e.target.checked) {
         filterArray.push(e.target.id)
      } else {
         index = filterArray.indexOf(e.target.id);
         filterArray.splice(index, 1)
      }

      this.setState({
         filterArray: filterArray
      })
         
     fetch('/filteredSearch', {
         method: 'POST',
         body: JSON.stringify({
            terms: this.state.searchTerms,
            filters: this.state.filterArray
         }),
         headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(vendors => {
         this.setState({
            vendors: vendors.vendors
         })
      })
   }

   handleSearch() {
      var searchTerm = document.getElementById("searchTerm").value;
      var terms = this.state.searchTerms;
      document.getElementById("searchTerm").value = "";
      terms.push(searchTerm);
      this.setState({
         searchTerms: terms
      })
      fetch('/filteredSearch', {
         method: 'POST',
         body: JSON.stringify({
            terms: this.state.searchTerms,
            filters: this.state.filterArray
         }),
         headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(vendors => {
         this.setState({
            vendors: vendors.vendors
         })
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
            vendors: vendors.vendors,
            searchTerms: terms
         });
      })
   }

   updateDistance(distance) {
      this.setState({ distance: Math.round(distance*10)/10});
      // console.log(this.state.distance);
   }

   render() { 
      return(
         <div controlid='vendors'>
            <h1 className={ global.h2 }>Spots near you</h1>
            <br />
            <div className={ styles.filters }>
               <Form.Row>
                  <Form.Group as={Col} xs={12} md={6}>
                     <Form.Row id="filters">
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Vegetarian"} id="v" onClick={(e) => { this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Open Now"} id="o" onClick= {(e)=> {this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Gluten Free"} id="gf" onClick= {(e)=> {this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Dairy Free"} id="df" onClick= {(e)=> {this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Kosher"} id="k" onClick= {(e)=> {this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4}>
                           <Form.Check inline label={"Halal"} id="h" onClick= {(e)=> {this.handleFilter(e)}} type="checkbox" />
                        </Form.Group>
                     </Form.Row>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6} lg={3} className={ styles.sliderDiv }>
                     <FilterSlider sliderValues={ this.state.sliderValues } onChange={ this.updateDistance }/>
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className={ classNames(styles.outerContainer, global.floatingWindow) }>
               <div className={ styles.mapColumn }>
                  <Map distance={ this.state.distance } vendors={ this.state.vendors } openModal={ this.handleShowInfo }/>
               </div>
               <div className={ styles.searchColumn }>
                  <InputGroup className={ styles.searchBar }>
                     <InputGroup.Prepend>
                        <Button type="submit" className={ styles.searchButton } onClick={this.handleSearch} variant="outline">
                           <i className="fa fa-search"></i>
                        </Button>
                     </InputGroup.Prepend>
                     <Form.Control className={ styles.searchInput } id="searchTerm" />
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
         </div>
      );
   }
}

export default Vendors;