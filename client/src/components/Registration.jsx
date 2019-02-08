import React from 'react';
import styles from '../styles/Registration.css';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         name: '',
         phone: '',
         address: '',
         city: '',
         state: '',
         zip: '',
         coordinates: null,
         keywords: []
      }
      this.updateName = this.updateName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateAddress = this.updateAddress.bind(this);
      this.updateCity = this.updateCity.bind(this);
      this.updateState = this.updateState.bind(this);
      this.updateZip = this.updateZip.bind(this);
      this.updateKeywords = this.updateKeywords.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
      //we don't want the form to submit, so we prevent the default behavior
      event.preventDefault();
      console.log("submitting form");

      let completeAddress = this.state.address + " " +
      this.state.city + ", " + this.state.state + " " + this.state.zip;

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
      })
       .then(function(response){
         return response.json()
       }).then(function(body){
         console.log(body);
       });
   }

   updateName(e) {
      this.setState({ name: e.target.value });
   }
   updatePhone(e) {
      this.setState({ phone: e.target.value });
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
   updateKeywords(e) {
      this.setState({ keywords: e.target.value });
   }

   render() {
      return(
         <div className={styles.outercontainer}>
            <h3 className={styles.headeritem}>Register</h3>
            
            <form className="registrationForm" onSubmit={this.handleSubmit}> 
               <div className = {styles.formrow}>
                  <label>Vendor Name:</label>
				   </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.name} className={styles.input} id="name" onChange={e => this.updateName(e)}  placeholder="Enter name of food stall" />
				   </div>

               <div className = {styles.formrow}>
                  <label>Phone Number:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="tel" value={this.state.phone} className={styles.input} id="phone" onChange={e => this.updatePhone(e)} placeholder="Enter phone number (xxx-xxx-xxxx)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                     required></input>
				   </div>

               <div className = {styles.formrow}>
                  <label> Address:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.address} className={styles.input} id="adr" name="address" onChange={e => this.updateAddress(e)}  placeholder="Enter address"></input>
               </div>
               

               <div className = {styles.formrow}>
                  <label> City:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.city} className={styles.input} id="city" name="city" onChange={e => this.updateCity(e)} placeholder="Enter city"></input>
               </div>

               <div className = {styles.formrow}>
                  <label>State:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.state} className={styles.input} id="state" name="state" onChange={e => this.updateState(e)} placeholder="Enter state"/>
               </div>

               <div className = {styles.formrow}>
                  <label>Zipcode:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.zip} className={styles.input} id="zip" name="zip" onChange={e => this.updateZip(e)}  placeholder="Enter zipcode"/>
               </div>

               <div className = {styles.formrow}>
                  <label>Keywords:</label>
               </div>
               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.keywords} className={styles.input} id="keywords" name="keywords" onChange={e => this.updateKeywords(e)} placeholder="Enter search terms for your food stall"/>
               </div>

               <div className = {styles.formrowbutton}>
                  <button type="submit">Submit</button>
               </div>

            </form>
         </div>
      );
   }
}

export default Registration;