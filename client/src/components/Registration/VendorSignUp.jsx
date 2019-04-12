import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Registration/VendorPortal.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';

import md5 from 'md5';

class VendorSignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         firstName: '',
         lastName: '',
         phone: '',
         email: '',
         password: '',
         isSuccessful: false,
         validated: false
      }
      this.updateFirstName = this.updateFirstName.bind(this);
      this.updateLastName = this.updateLastName.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.updatePassword = this.updatePassword.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleClearForm() {
      this.setState({
         firstName: '',
         lastName: '',
         phone: '',
         email: '',
         password: ''
      });
   }

   handleSubmit(event) {
      var self = this;

      if (event.currentTarget.checkValidity() === false) {
         event.stopPropagation;
         this.setState({ validated: true });
      } else {
         fetch('/vendor/signup',{
            method: 'POST',
            body: JSON.stringify({
               email: self.state.email,
               password: self.state.password,
            }),
            headers: {"Content-Type": "application/json"}
         })
         .then(res => res.json())
         .then(response => {
            if(response.success){
               console.log(response.vendor);
               self.props.history.push({
                  pathname:'/register',
                  state: {
                     vendor: response.vendor
                  }
               });
            }
            else{
               var x = document.getElementById("alertDiv");
               x.style.display = "block";
            }
         })
      }
   }

   updateFirstName(e){
      this.setState({ firstName: e.target.value });
   }
   updateLastName(e){
      this.setState({ lastName: e.target.value });
   }
   updatePhone(e){
      this.setState({ phone: e.target.value });
   }
   updateEmail(e){
      this.setState({ email: e.target.value });
   }
   updatePassword(e){
      let hash = md5(e.target.value)
      this.setState({ password: hash });
   }

   render() {
      return(
         <div className={classNames(styles.innerContainer, global.formContainer)}>
            <div className={styles.column}>
               <h1 className={global.formHeader}>Sign Up</h1>
               <br />
               <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
                  <Form.Row>
                     <Form.Group as={Col} controlId="firstName" xs={12} md={6}>
                     <Form.Label>First Name</Form.Label>
                     <Form.Control placeholder="Enter first name" onChange={e => this.updateFirstName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group as={Col} controlId="lastName" xs={12} md={6}>
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control placeholder="Enter last name" onChange={e => this.updateLastName(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your last name.</Form.Control.Feedback>
                     </Form.Group>
                  </Form.Row>

                  <Form.Row>
                     <Form.Group as={Col} controlId="emailSignUp" xs={12} md={12}>
                     <Form.Label>Email</Form.Label>
                     <Form.Control placeholder="Enter email" onChange={e => this.updateEmail(e)} required />
                     <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                     </Form.Group>
                  </Form.Row>

                  <Form.Row>
                     <Form.Group as={Col} controlId="phoneNumber" xs={12} md={12}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="123-456-7890" pattern="^\d{3}-\d{3}-\d{4}$" onChange={e => this.updatePhone(e)} required />
                        <Form.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form.Control.Feedback>
                     </Form.Group>
                  </Form.Row>

                  <Form.Row>
                     <Form.Group as={Col} controlId="passwordSignUp" xs={12} md={12}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="********" type="password" title="Password must be 8 characters including 1 uppercase letter, 1 lowercase letter and numeric characters" 
                        required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" onChange={e => this.updatePassword(e)} required />
                        <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
                        <Form.Text className="text-muted">Password must be 8 characters including 1 uppercase letter, 1 lowercase letter and numeric characters</Form.Text>
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

                  <Form.Row>
                     <Form.Group as={Col}>
                        <a className="small" href="javascript:void();" onClick={this.props.toggleLogInSignUp}>Already have an account?</a>
                     </Form.Group>
                  </Form.Row>
                  <Form.Row>
                     <div className={"alert alert-danger " + styles.emailExists} id="alertDiv" role="alert" display="none">
                        An account with this email already exists<a href="#" className="alert-link"></a>.
                     </div>
                  </Form.Row>
               </Form>
            </div>
         </div>
      );
   }
}

export default VendorSignUp;