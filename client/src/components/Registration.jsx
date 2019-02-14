import React from 'react';
import styles from '../styles/Registration.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import TimeOptions from './RegistrationTimeOptions.jsx';
import RegistrationVendor from './RegistrationVendor.jsx';
// import Geosuggest from 'react-bootstrap-geosuggest/';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         name: '',
         phone: '',
         location: '',
         week: [],
         startTime: null,
         endTime: null,
         coordinates: null,
         keywords: [],
         validated: false,
         numVendors: 1
      }
      this.updateName = this.updateName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateLocation = this.updateLocation.bind(this);
      this.updateWeek = this.updateWeek.bind(this);
      this.updateStartTime = this.updateStartTime.bind(this);
      this.updateEndTime = this.updateEndTime.bind(this);
      this.updateKeywords = this.updateKeywords.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.activatePlacesSearch = this.activatePlacesSearch.bind(this);
      this.onAddVendor = this.onAddVendor.bind(this);
      this.onRemoveVendor = this.onRemoveVendor.bind(this);
   }

   handleClearForm() {
      console.log("hello");
      this.setState({
         name: '',
         phone: '',
         location: '',
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
         fetch('/vendor/create',{
            method: 'POST',
            body: JSON.stringify({
               name: this.state.name,
               phone: this.state.phone,
               location: {
                  // address: completeAddress,
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

   onAddVendor() {
      this.setState({ numVendors: this.state.numVendors + 1 });
   }

   onRemoveVendor() {
      this.setState({ numVendors: this.state.numVendors -1 })
   }

   updateName(e) {
      this.setState({ name: e.target.value });
   }
   updatePhone(e) {
      this.setState({ phone: e.target.value });
   }
   updateLocation(location) {
      this.setState({ location: location });
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

      const vendors = [];
      for (var i = 0; i < this.state.numVendors; i += 1) {
        vendors.push(<RegistrationVendor key={i} number={i}/>);
        console.log(vendors);
      };

      return(
         <div className={styles.outercontainer}>
            <h1>Vendor Registration</h1>
            <br /> <br />
            <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
               <h3>Stall Information</h3>
               <br />
               <Form.Row>
                  <Form.Group as={Col} controlId="stallName" xs={12} md={6}>
                     <Form.Label>Stall Name</Form.Label>
                     <Form.Control placeholder="Enter stall name" onChange={e => this.updateName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your stall name (ex. Carlo's Mangoes).</Form.Control.Feedback>
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

               <Form.Row>
                  <Form.Group as={Col} controlId="keywords" xs={12} md={6}>
                     <Form.Label>Keywords (optional)</Form.Label>
                     <Form.Control as="textarea" rows="3" cols="60" onChange={e => this.updateKeywords(e)}/>
                     <Form.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form.Label>Opening Days (optional)</Form.Label>
                     <Form.Group>
                        <Form.Check label="M" value="Monday" type="checkbox" onChange={(e) => this.updateWeek(e, 0)} />
                        <Form.Check label="T" value="Tuesday" type="checkbox" onChange={(e) => this.updateWeek(e, 1)} />
                        <Form.Check label="W" value="Wednesday" type="checkbox" onChange={(e) => this.updateWeek(e, 2)} />
                        <Form.Check label="T" value="Thursday" type="checkbox" onChange={(e) => this.updateWeek(e, 3)} />
                        <Form.Check label="F" value="Friday" type="checkbox" onChange={(e) => this.updateWeek(e, 4)} />
                        <Form.Check label="S" value="Saturday" type="checkbox" onChange={(e) => this.updateWeek(e, 5)} />
                        <Form.Check label="S" value="Sunday" type="checkbox" onChange={(e) => this.updateWeek(e, 6)} />
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

               <h3>Vendor Information</h3>
               <br />
               <AllVendors addVendor={this.onAddVendor} vendors={vendors}>
               </AllVendors>
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

const AllVendors = props => (
   <div className="vendors">
     <div id="vendors-pane">
       {props.vendors}
     </div>
     <p><a href="void:()" onClick={props.addVendor}>+ Add Another Vendor</a></p>
   </div>
 );

export default Registration;