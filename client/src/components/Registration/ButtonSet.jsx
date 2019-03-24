import React from 'react';
import styles from '../../styles/Registration/Registration.css'
 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ButtonSet = props => {
    if (props.status.view) {
        return (
            <div className={ styles.editButtonDiv }>
                <Button variant="light" onClick={props.onClickEdit}> <i className="far fa-edit" /></Button>
            </div>
        );
    } else if (props.status.edit) {
        return (
            <Form.Row>
                <Button className={ styles.button } variant="primary" onClick={ props.onClickSave }>Save Changes</Button>
                <Button className={ styles.button } variant="secondary" onClick={ props.onClickCancel }>Cancel</Button>
            </Form.Row>
        );
    } else {
        return (
            <Form.Row>
                <Button className={ styles.button } variant="primary" type="submit">Submit</Button>
                <Button className={ styles.button } variant="secondary" type="reset" onClick={ props.onClickReset }>Reset</Button>
            </Form.Row>
        );
    }
 }

 export default ButtonSet;