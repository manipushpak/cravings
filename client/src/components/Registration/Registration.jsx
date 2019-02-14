import React from 'react';
import styles from '../../styles/Registration.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import WeekOptions from './WeekOptions.jsx';
// import Geosuggest from 'react-bootstrap-geosuggest/';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
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
      }
      this.updateStallName = this.updateStallName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateAddress = this.updateAddress.bind(this);
      this.updateCoordinates = this.updateCoordinates.bind(this);
      this.updateWeek = this.updateWeek.bind(this);
      this.updateStartTime = this.updateStartTime.bind(this);
      this.updateEndTime = this.updateEndTime.bind(this);
      this.updateHours = this.updateHours.bind(this);
      this.updateKeywords = this.updateKeywords.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.activatePlacesSearch = this.activatePlacesSearch.bind(this);
      this.useCurrentLocation = this.useCurrentLocation.bind(this);
   }

   handleClearForm() {
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
         }).then(function(response){
            alert("hell yeah");
            return response.json();
         });
      }
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

      return(
         <div className={styles.outerContainer}>
            <h1>Vendor Registration</h1>
            <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
               <br /><br /><h3>Stall Information</h3><br />

               <Row>
                  <Form.Group as={Col} controlId="stallName" xs={12} md={6}>
                     <Form.Label>Stall Name</Form.Label>
                     <Form.Control placeholder="Enter stall name (ex. Carlo's Mangoes)" onChange={e => this.updateStallName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your stall name (ex. Carlo's Mangoes).</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="phoneNumber" xs={12} md={6}>
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control placeholder="Enter phone number (123-456-7890)" pattern="^\d{3}-\d{3}-\d{4}$" onChange={e => this.updatePhone(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form.Control.Feedback>
                  </Form.Group>
               </Row>

               <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <InputGroup>
                     <Form.Control placeholder="Enter street address" id="vendorRegistrationLocation" className= { styles.inputStreetAddress } value={this.state.address} onChange={e => this.updateAddress(e.target.value)} />
                     <InputGroup.Append className={ styles.inputGroupAppend }>
                        <Button variant="light" onClick={e => this.useCurrentLocation(e)}>Use Current Location</Button>
                     </InputGroup.Append>
                  </InputGroup>
                  <Button size="sm" variant="light" className={ styles.inputGroupButton } onClick={e => this.useCurrentLocation(e)}>Use Current Location</Button>

                  <Form.Text id="userLocationText" className="text-muted"></Form.Text>
                  <Form.Control.Feedback type="invalid">Please enter your street address.</Form.Control.Feedback>
               </Form.Group>

               <Row>
                  <Form.Group as={Col} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form.Label>Opening Days and Hours (optional)</Form.Label>
                     <WeekOptions label="Monday" disabled={!this.state.hours[0].open}
                        ocCheck={e => this.updateWeek(e,0)} ocStart={e => this.updateStartTime(e,0)} ocEnd={e => this.updateEndTime(e,0)} />
                     <WeekOptions label="Tuesday" disabled={!this.state.hours[1].open}
                        ocCheck={e => this.updateWeek(e,1)} ocStart={e => this.updateStartTime(e,1)} ocEnd={e => this.updateEndTime(e,1)} />
                     <WeekOptions label="Wednesday" disabled={!this.state.hours[2].open}
                        ocCheck={e => this.updateWeek(e,2)} ocStart={e => this.updateStartTime(e,2)} ocEnd={e => this.updateEndTime(e,2)} />
                     <WeekOptions label="Thursday" disabled={!this.state.hours[3].open}
                        ocCheck={e => this.updateWeek(e,3)} ocStart={e => this.updateStartTime(e,3)} ocEnd={e => this.updateEndTime(e,3)} />
                     <WeekOptions label="Friday" disabled={!this.state.hours[4].open}
                        ocCheck={e => this.updateWeek(e,4)} ocStart={e => this.updateStartTime(e,4)} ocEnd={e => this.updateEndTime(e,4)} />
                     <WeekOptions label="Saturday" disabled={!this.state.hours[5].open}
                        ocCheck={e => this.updateWeek(e,5)} ocStart={e => this.updateStartTime(e,5)} ocEnd={e => this.updateEndTime(e,5)} />
                     <WeekOptions label="Sunday" disabled={!this.state.hours[6].open}
                        ocCheck={e => this.updateWeek(e,6)} ocStart={e => this.updateStartTime(e,6)} ocEnd={e => this.updateEndTime(e,6)} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="keywords" xs={12} md={6}>
                     <Form.Label>Keywords (optional)</Form.Label>
                     <Form.Control as="textarea" rows="5" cols="60" onChange={e => this.updateKeywords(e)}/>
                     <Form.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form.Text>
                  </Form.Group>
               </Row>

               <br />
               <h3>Vendor Information</h3>
               <br />

               <Form.Row>
                  <Form.Group as={Col} controlId="firstName" xs={12} md={6}>
                     <Form.Label>First Name</Form.Label>
                     <Form.Control placeholder="Enter first name" required />
                     <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName" xs={12} md={6}>
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control placeholder="Enter last name" required />
                     <Form.Control.Feedback type="invalid">Please enter your last number.</Form.Control.Feedback>
                  </Form.Group>
               </Form.Row>

               <br />
               
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