import React from 'react';
 
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import styles from '../../styles/Registration/RegistrationVendor.css';

class RegistrationVendor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <Form.Row>
                <Form.Group as={Col} controlId="firstName" xs={12} md={5}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="Enter first name" required />
                    <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="lastName" xs={12} md={5}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Enter last name" required />
                    <Form.Control.Feedback type="invalid">Please enter your last number.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="remove" xs={12} md={1}>
                    <br />
                    <p><a className = {styles.aTag} href="void:()" onClick={this.props.onRemoveVendor}>
                        <i className="far fa-trash-alt"></i>
                    </a></p>
                </Form.Group>
            </Form.Row>
        );
    }
}

export default RegistrationVendor;