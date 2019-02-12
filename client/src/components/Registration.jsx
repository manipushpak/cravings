import React from 'react';
import styles from '../styles/Registration.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import StateOptions from './RegistrationElements/StateOptions.jsx';
import TimeOptions from './RegistrationElements/TimeOptions.jsx';
// import Geosuggest from 'react-bootstrap-geosuggest/';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         name: '',
         phone: '',
         location: '',
         address: '',
         city: '',
         state: '',
         zip: '',
         week: [],
         startTime: null,
         endTime: null,
         coordinates: null,
         keywords: [],
         validated: false
      }
      this.updateName = this.updateName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateLocation = this.updateLocation.bind(this);
      this.updateAddress = this.updateAddress.bind(this);
      this.updateCity = this.updateCity.bind(this);
      this.updateState = this.updateState.bind(this);
      this.updateZip = this.updateZip.bind(this);
      this.updateWeek = this.updateWeek.bind(this);
      this.updateStartTime = this.updateStartTime.bind(this);
      this.updateEndTime = this.updateEndTime.bind(this);
      this.updateKeywords = this.updateKeywords.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.activatePlacesSearch = this.activatePlacesSearch.bind(this);
   }

   handleClearForm() {
      console.log("hello");
      this.setState({
         name: '',
         phone: '',
         location: '',
         address: '',
         city: '',
         state: '',
         zip: '',
         week: [],
         startTime: null,
         endTime: null,
         coordinates: null,
         keywords: [],
         validated: false
      });
   }

   handleSubmit(event) {
      // We don't want the form to submit, so we prevent the default behavior
      event.preventDefault();
      if (event.currentTarget.checkValidity() === false) {
         event.stopPropagation;
         this.setState({ validated: true });
      } else {
         let completeAddress = this.state.address + ", " + this.state.city
         + ", " + this.state.state + " " + this.state.zip;
   
         fetch('/vendor/create',{
            method: 'POST',
            body: JSON.stringify({
               name: this.state.name,
               phone: this.state.phone,
               location: {
                  address: completeAddress,
                  coordinate: this.state.coordinates
               },
               keywords: this.state.keywords
            }),
            headers: {"Content-Type": "application/json"}
         }).then(function(response){
            alert("hell yeah");
            return response.json();
         });

      }
   }

   updateName(e) {
      this.setState({ name: e.target.value });
   }
   updatePhone(e) {
      this.setState({ phone: e.target.value });
   }
   updateLocation(location) {
      this.setState({ location: location });
      console.log("hello, " + location);
   }
   updateAddress(e) {
      this.setState({ address: e.target.value });
   }
   updateCity(e) {
      this.setState({ city: e.target.value });
   }
   updateState(e) {
      this.setState({ state: e.target.value });
   }
   updateZip(e) {
      this.setState({ zip: e.target.value });
   }
   updateWeek(e, index) {
      console.log(index);
      var newWeek = this.state.week.slice();
      if (e.target.checked) {
         newWeek.push(e.target.value);
      } else {
         newWeek = newWeek.filter(item => item !== e.target.value);
      }
      this.setState({ week: newWeek });
   }
   updateStartTime(e) {
      this.setState({ startTime: parseInt(e.target.value, 10) });
   }
   updateEndTime(e) {
      this.setState({ endTime: parseInt(e.target.value, 10) });
   }   
   updateKeywords(e) {
      this.setState({ keywords: e.target.value.split(", ") });
   }

   activatePlacesSearch() {
      var self = this;
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('vendorRegistrationLocation'));
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
         var place = autocomplete.getPlace();
         getAddressAndCoordinates(place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng());
      });

      function getAddressAndCoordinates(address, lat, lng) {
         self.updateLocation(address);
      }
  }

   render() {
      google.maps.event.addDomListener(window, 'load', this.activatePlacesSearch);

      return(
         <div className={styles.outercontainer}>
            <h1>Vendor Registration</h1>
            <br />
            <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
               <Form.Row>
                  <Form.Group as={Col} controlId="vendorName" xs={12} md={6}>
                     <Form.Label>Vendor Name</Form.Label>
                     <Form.Control placeholder="Enter vendor name" onChange={e => this.updateName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your vendor name.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="phoneNumber" xs={12} md={6}>
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control placeholder="123-456-7890" pattern="^\d{3}-\d{3}-\d{4}$" onChange={e => this.updatePhone(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form.Control.Feedback>
                  </Form.Group>
               </Form.Row>

               <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control id="vendorRegistrationLocation" />
                  <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
               </Form.Group>

               <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St." onChange={e => this.updateAddress(e)} required />
                  <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
               </Form.Group>

               <Form.Row>
                  <Form.Group as={Col} controlId="city" xs={12} md={6}>
                     <Form.Label>City</Form.Label>
                     <Form.Control onChange={e => this.updateCity(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your city.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="state" xs={12} md={3}>
                     <Form.Label>State</Form.Label>
                     <StateOptions onChange={e => this.updateState(e)} />
                     <Form.Control.Feedback type="invalid">Please select your state.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="zip" xs={12} md={3}>
                     <Form.Label>Zip</Form.Label>
                     <Form.Control pattern="^\d{5}$" onChange={e => this.updateZip(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your zipcode.</Form.Control.Feedback>
                  </Form.Group>
               </Form.Row>

               <Form.Row>
                  <Form.Group as={Col} controlId="keywords" xs={12} md={6}>
                     <Form.Label>Keywords (optional)</Form.Label>
                     <Form.Control as="textarea" rows="3" cols="60" onChange={e => this.updateKeywords(e)}/>
                     <Form.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form.Label>Opening Days (optional)</Form.Label>
                     <Form.Group>
                        <Form.Check inline label="M" value="Monday" type="checkbox" onChange={(e) => this.updateWeek(e, 0)} />
                        <Form.Check inline label="T" value="Tuesday" type="checkbox" onChange={(e) => this.updateWeek(e, 1)} />
                        <Form.Check inline label="W" value="Wednesday" type="checkbox" onChange={(e) => this.updateWeek(e, 2)} />
                        <Form.Check inline label="T" value="Thursday" type="checkbox" onChange={(e) => this.updateWeek(e, 3)} />
                        <Form.Check inline label="F" value="Friday" type="checkbox" onChange={(e) => this.updateWeek(e, 4)} />
                        <Form.Check inline label="S" value="Saturday" type="checkbox" onChange={(e) => this.updateWeek(e, 5)} />
                        <Form.Check inline label="S" value="Sunday" type="checkbox" onChange={(e) => this.updateWeek(e, 6)} />
                     </Form.Group>
                     <Form.Label>Opening Hours (optional)</Form.Label>
                     <Form.Row>
                        <Form.Group as={Col} controlId="startTime" xs={6} >
                           <TimeOptions placeholder="Start Time" onChange={e => this.updateStartTime(e)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="endTime" xs={6} >
                           <TimeOptions placeholder="End Time" onChange={e => this.updateEndTime(e)} />
                        </Form.Group>
                     </Form.Row>
                  </Form.Group>
               </Form.Row>

               <Form.Row>
                  <Button className={ styles.button } variant="primary" type="submit">
                     Submit
                  </Button>
                  <Button className={ styles.button } variant="secondary" type="reset" onClick={ this.handleClearForm }>
                     Reset
                  </Button>
               </Form.Row>
            </Form>

         </div>
      );
   }
}

export default Registration;