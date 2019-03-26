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
            <Form.Row xs={12}>
                <Form.Group as={Col} controlId="firstName" xs={12} md>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control readOnly={this.props.readOnly} placeholder="Enter first name" required />
                    <Form.Control.Feedback type="invalid">Please enter your first name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="lastName" xs={12} md>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control readOnly={this.props.readOnly} placeholder="Enter last name" required />
                    <Form.Control.Feedback type="invalid">Please enter your last number.</Form.Control.Feedback>
                </Form.Group>
                <DeleteVendorButton readOnly={this.props.readOnly} onClick={this.props.onRemoveVendor} />
            </Form.Row>
        );
    }
}

const DeleteVendorButton = props => {
    if (props.readOnly) {
        return null;
    }

    return (
        <Form.Group as={Col} controlId="remove" xs={12} md="auto" className={styles.aTag}>
            <a className={ styles.aTag } href="void:()" onClick={props.onClick}>
                <i className="far fa-trash-alt"></i>
            </a>
        </Form.Group>
    );
}

export default RegistrationVendor;