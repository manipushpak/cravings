import React from 'react';
import styles from '../../styles/Registration/Registration.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { withRouter } from 'react-router-dom';

import ButtonSet from './ButtonSet.jsx';
import RegistrationVendor from './RegistrationVendor.jsx';
import WeekOptions from './WeekOptions.jsx';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         vendor: typeof this.props.location.state.vendor,
         status: {
            edit: props.isEdit,
            view: props.isView
         },
         stallName: '',
         phone: '',
         address: '',
         coordinates: {
            lat: null,
            lng: null
         },
         hours: [
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
         ],
         keywords: [],
         numVendors: 1,
         validated: false
      }
      console.log(this.state.vendor);
      
      // External Form Functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleResetForm = this.handleResetForm.bind(this);
      this.handleEditForm = this.handleEditForm.bind(this);
      this.handleSaveEdit = this.handleSaveEdit.bind(this);
      this.handleCancelEdit = this.handleCancelEdit.bind(this);

      // Set State Functions
      this.setToView = this.setToView.bind(this);
      this.setToEdit = this.setToEdit.bind(this);
      this.updateStallName = this.updateStallName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateAddress = this.updateAddress.bind(this);
      this.updateCoordinates = this.updateCoordinates.bind(this);
      this.updateWeek = this.updateWeek.bind(this);
      this.updateStartTime = this.updateStartTime.bind(this);
      this.updateEndTime = this.updateEndTime.bind(this);
      this.updateHours = this.updateHours.bind(this);
      this.updateKeywords = this.updateKeywords.bind(this);

      // Internal Form Functions
      this.activatePlacesSearch = this.activatePlacesSearch.bind(this);
      this.onAddVendor = this.onAddVendor.bind(this);
      this.onRemoveVendor = this.onRemoveVendor.bind(this);
      this.useCurrentLocation = this.useCurrentLocation.bind(this);
   }
   
   handleSubmit(event) {
      event.preventDefault();
      if (event.currentTarget.checkValidity() === false) {
         event.stopPropagation;
         this.setState({ validated: true });
      } else {   
         fetch('/vendor/create',{
            method: 'POST',
            body: JSON.stringify({
               stallName: this.state.stallName,
               phone: this.state.phone,
               location: {
                  address: this.state.address,
                  coordinate: this.state.coordinates
               },
               hours: this.state.hours,
               keywords: this.state.keywords
            }),
            headers: {"Content-Type": "application/json"}
         }).then((response) => {
            this.setState({
               status: {
                  edit: false,
                  view: true
               },
            });
            return response.json();
         });
      }
   }
   handleResetForm() {
      this.setState({
         stallName: '',
         phone: '',
         address: '',
         coordinates: {
            lat: null,
            lng: null
         },
         hours: [
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
            {open: false, startTime: null, endTime: null},
         ],
         keywords: [],
         validated: false
      });
   }
   handleEditForm() {
      this.setToEdit
   }
   handleSaveEdit(event) {
      this.setToView();
   }
   handleCancelEdit(event) {
      this.setToView();
   }

   setToView() {
      this.setState({ status: { edit: false, view: true } });
   }
   setToEdit() {
      this.setState({ status: { edit:true, view: false } });
   }

   updateStallName(e) {
      this.setState({ stallName: e.target.value });
   }
   updatePhone(e) {
      this.setState({ phone: e.target.value });
   }
   updateAddress(address) {
      this.setState({ address: address });
   }
   updateCoordinates(lat, lng) {
      var coordinates = {...this.state.coordinates};
      coordinates.lat = lat; coordinates.lng = lng;
      this.setState({ coordinates: coordinates });
   }
   updateWeek(e, index) {
      var weekday = this.state.hours[index];
      weekday.open = e.target.checked;
      this.updateHours(index, weekday);
   }
   updateStartTime(e, index) {
      var weekday = this.state.hours[index];
      weekday.startTime = e.target.value;
      this.updateHours(index, weekday);
   }
   updateEndTime(e, index) {
      var weekday = this.state.hours[index];
      weekday.endTime = e.target.value;
      this.updateHours(index, weekday);
   }   
   updateHours(index, weekday) {
      this.setState(prevState => ({
         hours: {
             ...prevState.hours,
             [index]: weekday
         }
     }));
   }
   updateKeywords(e) {
      this.setState({ keywords: e.target.value.split(", ") });
   }

   onAddVendor() {
      this.setState({ numVendors: this.state.numVendors + 1 });
   }
   onRemoveVendor() {
      this.setState({ numVendors: this.state.numVendors -1 })
   }

   activatePlacesSearch() {
      var self = this;
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('vendorRegistrationLocation'));
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
         var place = autocomplete.getPlace();
         setAddressAndCoordinates(place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng());
      });

      function setAddressAndCoordinates(address, lat, lng) {
         self.updateAddress(address);
         self.updateCoordinates(lat, lng);
      }
   }

   useCurrentLocation(e) {
      var self = this;
      e.preventDefault();
      
      document.getElementById("userLocationText").innerHTML = "Detecting current location...";
      
      navigator.geolocation.getCurrentPosition(
         position => {
            const { latitude, longitude } = position.coords;
            var gPosition = new google.maps.LatLng(latitude, longitude);

            var gGeocoder = new google.maps.Geocoder();
            gGeocoder.geocode({ 'latLng': gPosition }, function(results, status) {
               if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  document.getElementById("userLocationText").innerHTML = "";
                  setAddressAndCoordinates(results[0].formatted_address, latitude, longitude);
               }
            });

            function setAddressAndCoordinates(address, lat, lng) {
               self.updateAddress(address);
               self.updateCoordinates(lat, lng);
            }
         },
         () => {
            document.getElementById("userLocationText").innerHTML = "Current location cannot be detected. Please try again or type in your street address.";
         }
      );
   }

   render() {
      google.maps.event.addDomListener(window, 'load', this.activatePlacesSearch);

      const vendors = [];
      for (var i = 0; i < this.state.numVendors; i += 1) {
        vendors.push(<RegistrationVendor key={i} number={i} onRemoveVendor={this.onRemoveVendor} readOnly={this.state.status.view}/>);
        console.log(vendors);
      };

      return(
         <div className={styles.outerContainer}>
            <h1>{ this.state.status.view || this.state.status.edit ? "My Account" : "Vendor Registration" }</h1>
            <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
               <br /><br />
               <h3>Stall Information</h3>
               <br />

               <Row>
                  <Form.Group as={Col} controlId="stallName" xs={12} md={6}>
                     <Form.Label>Stall Name</Form.Label>
                     <Form.Control readOnly={this.state.status.view} placeholder="Enter stall name (ex. Carlo's Mangoes)" onChange={e => this.updateStallName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your stall name (ex. Carlo's Mangoes).</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="phoneNumber" xs={12} md={6}>
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control readOnly={this.state.status.view} placeholder="Enter phone number (123-456-7890)" pattern="^\d{3}-\d{3}-\d{4}$" onChange={e => this.updatePhone(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form.Control.Feedback>
                  </Form.Group>
               </Row>

               <AddressSet view={this.state.status.view} value={this.state.address} onChange={e => this.updateAddress(e.target.value)} onClick={e => this.useCurrentLocation(e)} />

               <Row>
                  <Form.Group as={Col} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form.Label>Opening Days and Hours (optional)</Form.Label>
                     <WeekOptions label="Monday" disabled={!this.state.hours[0].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,0)} ocStart={e => this.updateStartTime(e,0)} ocEnd={e => this.updateEndTime(e,0)} />
                     <WeekOptions label="Tuesday" disabled={!this.state.hours[1].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,1)} ocStart={e => this.updateStartTime(e,1)} ocEnd={e => this.updateEndTime(e,1)} />
                     <WeekOptions label="Wednesday" disabled={!this.state.hours[2].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,2)} ocStart={e => this.updateStartTime(e,2)} ocEnd={e => this.updateEndTime(e,2)} />
                     <WeekOptions label="Thursday" disabled={!this.state.hours[3].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,3)} ocStart={e => this.updateStartTime(e,3)} ocEnd={e => this.updateEndTime(e,3)} />
                     <WeekOptions label="Friday" disabled={!this.state.hours[4].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,4)} ocStart={e => this.updateStartTime(e,4)} ocEnd={e => this.updateEndTime(e,4)} />
                     <WeekOptions label="Saturday" disabled={!this.state.hours[5].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,5)} ocStart={e => this.updateStartTime(e,5)} ocEnd={e => this.updateEndTime(e,5)} />
                     <WeekOptions label="Sunday" disabled={!this.state.hours[6].open} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,6)} ocStart={e => this.updateStartTime(e,6)} ocEnd={e => this.updateEndTime(e,6)} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="keywords" xs={12} md={6}>
                     <Form.Label>Keywords (optional)</Form.Label>
                     <Form.Control as="textarea" rows="5" cols="60" readOnly={this.state.status.view} onChange={e => this.updateKeywords(e)}/>
                     <Form.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form.Text>
                  </Form.Group>
               </Row>

               <br />
               <h3>Vendor Information</h3>
               <br />

               <AllVendors addVendor={this.onAddVendor} vendors={vendors} toShow={this.state.status.edit} />

               <br />
               
               <ButtonSet status={this.state.status} 
                  onClickCancel={ this.handleCancelEdit }
                  onClickEdit={ this.handleEditForm }
                  onClickReset={ this.handleResetForm }
                  onClickSave={ this.handleSaveEdit }
               />
            </Form>
         </div>
      );
   }
}

const AddressSet = props => {
   if (props.view) {
      return(
         <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control readOnly placeholder="Enter street address" id="vendorRegistrationLocation" className={ styles.inputStreetAddressView } value={props.address} onChange={props.onChange} />
            <Form.Text id="userLocationText" className="text-muted"></Form.Text>
            <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
         </Form.Group>
      );
   } else {
      return (
         <Form.Group>
            <Form.Label>Address</Form.Label>
            <InputGroup>
               <Form.Control placeholder="Enter street address" id="vendorRegistrationLocation" className={ styles.inputStreetAddress } value={props.address} onChange={props.onChange} required />
               <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
               <InputGroup.Append className={ styles.inputGroupAppend }>
                  <Button variant="light" onClick={props.onClick}>Use Current Location</Button>
               </InputGroup.Append>
            </InputGroup>
            <Button size="sm" variant="light" className={ styles.inputGroupButton } onClick={props.onClick} block>Use Current Location</Button>
            <Form.Text id="userLocationText" className="text-muted"></Form.Text>
         </Form.Group>
      );
   }
}

const AllVendors = props => (
   <div className="vendors">
     <div id="vendors-pane">
       {props.vendors}
     </div>
     <p show={props.toShow}><a href="void:()" onClick={props.addVendor}>+ Add Another Vendor</a></p>
   </div>
);

export default withRouter(Registration);