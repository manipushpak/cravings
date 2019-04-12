import React from 'react';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Registration/VendorPortal.css';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';

import md5 from 'md5';


class VendorLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '', 
            isSuccessful: false,
            validated: false
        }
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var self = this;

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation;
            this.setState({ validated: true });
        } else {
            fetch('/vendor/authenticate',{
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
                    self.props.history.push({
                        pathname:'/account',
                        state:{
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
            <div className={classNames(styles.innerContainer, global.formContainer)}>
                <div className={styles.column}>
                    <h1 className={global.formHeader}>Log In</h1>
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
                            <Form.Group as={Col}>
                                <a className="small" href="javascript:void(0)">Forgot password?</a>
                                <div className="d-flex justify-content-center links"></div>
                                <Form.Text className="text-muted">Don't have an account? <a href="javascript:void(0)" onClick={this.props.toggleLogInSignUp}>Sign up.</a></Form.Text>
                            </Form.Group>
                        </Form.Row>   
                        <br />
                        <Form.Row>
                            <div className={"alert alert-danger " + styles.emailExists} id="alertDiv" role="alert" display="none">
                                Incorrect password or account doesn't exist<a href="#" className="alert-link"></a>.
                            </div>  
                        </Form.Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(VendorLogIn);