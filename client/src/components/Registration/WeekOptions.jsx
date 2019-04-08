import React from 'react';
import styles from '../../styles/Registration/Registration.css';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TimeOptions from './TimeOptions.jsx';

const WeekOptions = props => {
    return (
        <Form.Row className={ styles.openingRow }>
            <Form.Group as={Col} xs={12} sm={4}>
                <Form.Check disabled={props.readOnly} label={props.label} checked={props.hours.open} type="checkbox" onChange={props.ocCheck} />
            </Form.Group>
            <Form.Group as={Col} xs={6} sm={4}>
                <TimeOptions disabled={props.disabled || props.readOnly} time={props.hours.startTime} placeholder="Start Time" onChange={props.ocStart} />
            </Form.Group>
            <Form.Group as={Col} xs={6} sm={4}>
                <TimeOptions disabled={props.disabled || props.readOnly} time={props.hours.endTime} placeholder="End Time" onChange={props.ocEnd} />
            </Form.Group>
        </Form.Row>
    );
}

export default WeekOptions;