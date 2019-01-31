import React from 'react';
import styles from '../styles/Registration.css';

class Registration extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         name: "Sonali",
         phone: "",
         address: "",
         city: "",
         state: "",
         zip: "",
         location: null,
         keywords: []
      };
   }

   handleSubmit(event) {
      //we don't want the form to submit, so we prevent the default behavior
      event.preventDefault();
      console.log("submitting form");
      console.log(this.state.name);

      var registrationForm = [
         name = this.state.name,
         phone = this.state.phone,
         address = this.state.address + " " + this.state.city + ", " + this.state.state + " " + this.state.zip,
         location = null,
         keywords = this.state.keywords.split(", ")
      ];
        //make a call to the server to create the vendor
        fetch('/server/data/createVendor', {
         method: 'POST',
         body: registrationForm,
       });
   }

   render() {
      return(
         <div className={styles.outercontainer}>
            <h3>Register</h3>
            <form className="registrationForm" onSubmit={this.handleSubmit}> 
               <div className = {styles.formrow}>
                  <label>Vendor Name:</label>
				   </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.name} className={styles.input} id="name" onChange={this.handleChange.bind(this)}  placeholder="Enter name of food stand" />
				   </div>

               <div className = {styles.formrow}>
                  <label>Phone Number:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="tel" value={this.state.inputValue} className={styles.input} id="phone" onChange={this.handleChange.bind(this)} placeholder="Enter phone number (xxx-xxx-xxxx)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                     required></input>
				   </div>

               <div className = {styles.formrow}>
                  <label> Address:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.inputValue} className={styles.input} id="adr" name="address" onChange={this.handleChange.bind(this)}  placeholder="Enter address"></input>
               </div>
               

               <div className = {styles.formrow}>
                  <label> City:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" className={styles.input} id="city" name="city" onChange={this.handleChange.bind(this)} placeholder="Enter city"></input>
               </div>

               <div className = {styles.formrow}>
                  <label>State:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.inputValue} className={styles.input} id="state" name="state" onChange={this.handleChange.bind(this)} placeholder="Enter state"/>
               </div>

               <div className = {styles.formrow}>
                  <label>Zipcode:</label>
               </div>

               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.inputValue} className={styles.input} id="zip" name="zip" onChange={this.handleChange.bind(this)}  placeholder="Enter zipcode"/>
               </div>

               <div className = {styles.formrow}>
                  <label>Keywords:</label>
               </div>
               <div className = {styles.formrowtwo}>
                  <input type="text" value={this.state.inputValue} className={styles.input} id="keywords" name="keywords" onChange={this.handleChange.bind(this)} placeholder="Please enter the key search terms for your food stall"/>
               </div>

               <div className = {styles.formrowbutton}>
                  <button type="submit">Submit</button>
               </div>

            </form>
         </div>
      );
   }
   handleChange(e) {
      this.setState({ name: e.target.value });
   }
}


export default Registration;