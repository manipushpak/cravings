import React from 'react';

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
            isSuccessful: false
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
            this.isSuccessful = true; // change this to call api to sign up user and see if its successful
            if(this.isSuccessful){
                window.location.assign('/#/vendorportal/account');
            }

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
        var innerContainer = classNames(styles.innerContainer, global.formContainer);

        return(
            <div className={innerContainer}>
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
                                <a className="small" href="javascript:void();">Forgot password?</a>
                                <Form.Text className="text-muted">Don't have an account? <a href="javascript:void(0)" onClick={this.props.toggleLogInSignUp}>Sign up.</a></Form.Text>
                            </Form.Group>
                        </Form.Row>   
                    </Form>
                </div>
            </div>
        );
    }
}

export default VendorLogIn;