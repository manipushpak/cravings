import React from 'react';
import styles from '../styles/LogIn.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';

import md5 from 'md5';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
        }
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // We don't want the form to submit, so we prevent the default behavior
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation;
            this.setState({ validated: true });
        } else {   
            fetch('/user/login',{
                method: 'POST',
                body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
                }),
                headers: {"Content-Type": "application/json"}
            }).then(function(response){
                console.log(response);
                return response.json();
            });

        }
    }

    handleClearForm() {
        this.setState({
            email: '',
            password: ''
        });
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
         <div className={styles.outercontainer}>
            <div className={styles.column}>
               <h1>Log In</h1>
               <br />
               <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="email" xs={12} md={12}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="Enter email" onChange={e => this.updateEmail(e)} required />
                            <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="password" xs={12} md={12}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder="********" type="password" onChange={e => this.updatePassword(e)} required />
                            <Form.Control.Feedback type="invalid">Please enter correct password.</Form.Control.Feedback>
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
                        <Form.Group as={Col} xs={12} md={12}>
                            <a className="small" href="#">Forgot password?</a>
                        </Form.Group>
                    </Form.Row>   
                </Form>
            </div>
         </div>
      );
   }
}

export default LogIn;