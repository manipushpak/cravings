import React from 'react';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Registration/Registration.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import ButtonSet from './ButtonSet.jsx';
import WeekOptions from './WeekOptions.jsx';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      var ven = this.props.location.state !== 'undefined' && this.props.location.state.vendor !== null ? this.props.location.state.vendor : [];
      var phone = ven.phone.substring(2);
      if(phone.length > 3){
         phone = phone.slice(0,3)+"-"+phone.slice(3,6)+"-"+phone.slice(6);
      }
      this.state = {
         vendor: ven,
         firstName: ven.vendorInfo.vendorName.firstName,
         lastName: ven.vendorInfo.vendorName.lastName,
         status: {
            edit: props.isEdit,
            view: props.isView
         },
         stallName: ven.vendorInfo.stallName,
         phone: phone,
         address: ven.vendorInfo.address.address,
         coordinates: {
            lat: ven.vendorInfo.address.coordinates.lat, 
            lng: ven.vendorInfo.address.coordinates.lng
         },
         hours: ven.vendorInfo.hours,
         keywords: ven.vendorInfo.keywords,
         flags: ven.vendorInfo.flags,
         validated: false
      }

      console.log(this.state.hours);

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
      this.updateFlags = this.updateFlags.bind(this);
      this.updateVendorFirstName = this.updateVendorFirstName.bind(this);
      this.updateVendorLastName = this.updateVendorLastName.bind(this);
      this.geocodeAddress = this.geocodeAddress.bind(this);
      this.callRegisterApi = this.callRegisterApi.bind(this);

      // Internal Form Functions
      this.activatePlacesSearch = this.activatePlacesSearch.bind(this);
      this.useCurrentLocation = this.useCurrentLocation.bind(this);
   }
   
   handleSubmit(event) {
      event.preventDefault();
      var geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.state.address);
      // if (event.currentTarget.checkValidity() === false) {
      //    event.stopPropagation;
      //    this.setState({ validated: true });
      // } else { 
      //    fetch('/vendor/register',{
      //       method: 'POST',
      //       body: JSON.stringify({
      //          vendor: {
      //             phone: updatedPhoneFormat,
      //             loginInfo: {
      //                email: this.state.vendor.loginInfo.email,
      //                password: this.state.vendor.loginInfo.password,
      //             },
      //             vendorInfo: {
      //                vendorName: {
      //                   firstName: this.state.firstName,
      //                   lastName: this.state.lastName
      //                },
      //                stallName: this.state.stallName,
      //                address: {
      //                   address: this.state.address,
      //                   coordinates: this.state.coordinates,
      //                },
      //                keywords: this.state.keywords,
      //                flags: this.state.flags,
      //                hours: this.state.hours,
      //             }
      //          },
      //       }),
      //       headers: {"Content-Type": "application/json"}
      //    }).then((response) => {
      //          if(this.state.status.edit){
      //             this.setToView();
      //          }
      //          else{
      //             this.setToEdit();
      //          }
      //    });
      // }
   }

   callRegisterApi(){
      var phone = this.state.phone;
      var updatedPhoneFormat = phone.replace(/-/g, "");
      updatedPhoneFormat = "+1" + updatedPhoneFormat;
      console.log(this.state.coordinates);
      fetch('/vendor/register',{
         method: 'POST',
         body: JSON.stringify({
            vendor: {
               phone: updatedPhoneFormat,
               loginInfo: {
                  email: this.state.vendor.loginInfo.email,
                  password: this.state.vendor.loginInfo.password,
               },
               vendorInfo: {
                  vendorName: {
                     firstName: this.state.firstName,
                     lastName: this.state.lastName
                  },
                  stallName: this.state.stallName,
                  address: {
                     address: this.state.address,
                     coordinates: this.state.coordinates,
                  },
                  keywords: this.state.keywords,
                  flags: this.state.flags,
                  hours: this.state.hours,
               }
            },
         }),
         headers: {"Content-Type": "application/json"}
      }).then((response) => {
            if(this.state.status.edit){
               this.setToView();
            }
            else{
               this.setToEdit();
            }
      });

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
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
            {open: false, startTime: -1, endTime: -1},
         ],
         keywords: [],
         flags: {
            v: false,
            gf: false,
            lf: false,
            k: false,
            h: false
         },
         validated: false
      });
   }
   handleEditForm() {
      this.setToEdit();
   }
   handleSaveEdit(event) {
      this.handleSubmit(event);
   }
   handleCancelEdit(event) {
      this.setToView();
   }

   setToEdit() {
      this.setState({ status: {edit: true, view: false } });
   }
   setToView() {
      this.setState({ status: {edit: false, view: true } });
   }

   updateStallName(e) {
      this.setState({ stallName: e.target.value });
   }
   updatePhone(e) {
      this.setState({ phone: e.target.value});
   }
   updateAddress(address) {
      this.setState({ address: address });
   }
   updateCoordinates(lat, lng) {
      var coordinates = {...this.state.coordinates};
      coordinates.lat = lat; coordinates.lng = lng;
      this.setState({ coordinates: coordinates 
      }, () => {
            this.callRegisterApi() });
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
      if(!weekday.open) {
         weekday.startTime = -1;
         weekday.endTime = -1;
      }

      this.setState(prevState => ({
         hours: {
             ...prevState.hours,
             [index]: weekday
         }
     }));
   }
   updateVendorFirstName(e){
      this.setState({
         firstName: e.target.value
      });
   }
   updateVendorLastName(e){
      this.setState({
         lastName: e.target.value
      })
   }
   updateKeywords(e) {
      this.setState({ keywords: e.target.value.split(", ") });
   }
   updateFlags(e) {
      var flags = this.state.flags;
      if (e.target.checked) {
         flags.push(e.target.name);
      } else {
         var index = flags.indexOf(e.target.name);
         flags.splice(index, 1);
      }

      this.setState({ flags: flags });
   }

   activatePlacesSearch() {
      console.log("entered");
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

   geocodeAddress(geocoder, address) {
      var self = this;
      geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            self.updateCoordinates(lat, lng);
           
      } else {
         //  alert('Geocode was not successful for the following reason: ' + status);
         console.log("Couldn't find coordinates for that address");
      }
      });
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
               } else {
                  document.getElementById("userLocationText").innerHTML = "Current location cannot be detected. Please try again or type in your street address.";
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

      return(
         <div className={classNames(styles.outerContainer, global.floatingWindow, global.formContainer)}>
            <h1 className={global.formHeader}>My Account</h1>
            <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
               <br /><br />
               <h3>Stall Information</h3>
               <br />

               <Row>
                  <Form.Group as={Col} controlId="stallName" xs={12} md={6}>
                     <Form.Label>Stall Name</Form.Label>
                     <Form.Control readOnly={this.state.status.view} defaultValue={this.state.stallName} placeholder="Enter stall name (ex. Carlo's Mangoes)" onChange={e => this.updateStallName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your stall name (ex. Carlo's Mangoes).</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="phoneNumber" xs={12} md={6}>
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control readOnly={this.state.status.view} defaultValue={this.state.phone} placeholder="Enter phone number (123-456-7890)" pattern="^\d{3}-\d{3}-\d{4}$" onChange={e => this.updatePhone(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form.Control.Feedback>
                  </Form.Group>
               </Row>

               <AddressSet readOnly={this.state.status.view} value={this.state.address} onChange={e => this.updateAddress(e.target.value)} onClick={e => this.useCurrentLocation(e)} />

               <Row>
                  <Form.Group as={Col} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form.Label>Opening Hours (optional)</Form.Label>
                     <WeekOptions label="Monday" disabled={!this.state.hours[0].open} hours={this.state.hours[0]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,0)} ocStart={e => this.updateStartTime(e,0)} ocEnd={e => this.updateEndTime(e,0)} />
                     <WeekOptions label="Tuesday" disabled={!this.state.hours[1].open} hours={this.state.hours[1]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,1)} ocStart={e => this.updateStartTime(e,1)} ocEnd={e => this.updateEndTime(e,1)} />
                     <WeekOptions label="Wednesday" disabled={!this.state.hours[2].open} hours={this.state.hours[2]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,2)} ocStart={e => this.updateStartTime(e,2)} ocEnd={e => this.updateEndTime(e,2)} />
                     <WeekOptions label="Thursday" disabled={!this.state.hours[3].open} hours={this.state.hours[3]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,3)} ocStart={e => this.updateStartTime(e,3)} ocEnd={e => this.updateEndTime(e,3)} />
                     <WeekOptions label="Friday" disabled={!this.state.hours[4].open} hours={this.state.hours[4]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,4)} ocStart={e => this.updateStartTime(e,4)} ocEnd={e => this.updateEndTime(e,4)} />
                     <WeekOptions label="Saturday" disabled={!this.state.hours[5].open} hours={this.state.hours[5]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,5)} ocStart={e => this.updateStartTime(e,5)} ocEnd={e => this.updateEndTime(e,5)} />
                     <WeekOptions label="Sunday" disabled={!this.state.hours[6].open} hours={this.state.hours[6]} readOnly={this.state.status.view}
                        ocCheck={e => this.updateWeek(e,6)} ocStart={e => this.updateStartTime(e,6)} ocEnd={e => this.updateEndTime(e,6)} />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={6}>
                     <Form.Group controlId="keywords">
                        <Form.Label>Keywords (optional - only up to 3!)</Form.Label>
                        <Form.Control readOnly={this.state.status.view} defaultValue={this.state.keywords} placeholder="Enter keywords" pattern="^([-A-Za-z0-9]\s?)+([,]\s{1}([-A-Za-z0-9]\s?)+){0,2}$" onChange={e => this.updateKeywords(e)}/>
                        <Form.Control.Feedback type="invalid">Please only enter up to 3 keywords separated by commas.</Form.Control.Feedback>                        
                        <Form.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form.Text>
                     </Form.Group>
                     <Form.Group controlId="dietary">
                        <Form.Label>Dietary Options (optional)</Form.Label>
                        <Form.Row>
                           <Form.Group as={Col} xs={12} sm={6}>
                              <Form.Check disabled={this.state.status.view} checked={this.state.flags.v} label="Vegetarian/Vegan" name="v" type="checkbox" onChange={e => this.updateFlags(e)} />
                              <Form.Check disabled={this.state.status.view} checked={this.state.flags.gf} label="Gluten-free" name="g-f" type="checkbox" onChange={e => this.updateFlags(e)} />
                              <Form.Check disabled={this.state.status.view} checked={this.state.flags.df} label="Dairy-free" name="d-f" type="checkbox" onChange={e => this.updateFlags(e)} />
                           </Form.Group>
                           <Form.Group as={Col} xs={12} sm={6}>
                              <Form.Check disabled={this.state.status.view} checked={this.state.flags.k} label="Kosher" name="k" type="checkbox" onChange={e => this.updateFlags(e)} />
                              <Form.Check disabled={this.state.status.view} checked={this.state.flags.h} label="Halal" name="h" type="checkbox" onChange={e => this.updateFlags(e)} />
                           </Form.Group>
                        </Form.Row>
                     </Form.Group>
                  </Form.Group>
               </Row>

               <br />
               <h3>Vendor Information</h3>
               <br />

               <Form.Row>
                  <Form.Group as={Col} controlId="firstName" xs={12} md={this.state.status.view ? 6 : 5}>
                     <Form.Label>First Name</Form.Label>
                     <Form.Control readOnly={this.state.status.view} defaultValue={this.state.firstName} onChange={e => this.updateVendorFirstName(e)} placeholder="Enter first name" required />
                     <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName" xs={12} md={this.state.status.view ? 6 : 5}>
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control  readOnly={this.state.status.view} defaultValue={this.state.lastName} onChange={e => this.updateVendorLastName(e)} placeholder="Enter last name" required />
                     <Form.Control.Feedback type="invalid">Please enter your last number.</Form.Control.Feedback>
                  </Form.Group>
               </Form.Row>

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
   if (props.readOnly) {
      return(
         <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control readOnly placeholder="Enter street address" id="vendorRegistrationLocation" className={ styles.inputStreetAddressView } defaultValue={props.value} onChange={props.onChange} />
            <Form.Text id="userLocationText" className="text-muted"></Form.Text>
            <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
         </Form.Group>
      );
   } else {
      return (
         <Form.Group>
            <Form.Label>Address</Form.Label>
            <InputGroup>
               <Form.Control placeholder="Enter street address" id="vendorRegistrationLocation" className={ styles.inputStreetAddress } defaultValue={props.value} onChange={props.onChange} required />
               <InputGroup.Append className={ styles.inputGroupAppend }>
                  <Button variant="light" onClick={props.onClick}>Use Current Location</Button>
               </InputGroup.Append>
               <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
            </InputGroup>
            <Button size="sm" variant="light" className={ styles.inputGroupButton } onClick={props.onClick} block>Use Current Location</Button>
            <Form.Text id="userLocationText" className="text-muted"></Form.Text>
         </Form.Group>
      );
   }
}

export default withRouter(Registration);