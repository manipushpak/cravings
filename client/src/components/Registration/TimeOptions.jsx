import React from 'react';
import styles from '../../styles/Registration/Registration.css';

import Form from 'react-bootstrap/Form';

const TimeOptions = props => {
    return (
        <Form.Control size="sm" as="select" disabled= { props.disabled } value={props.time} className={ styles.timeOptions } onChange={ props.onChange } xs={6} md={3} required >
            <option value="-1">{ props.placeholder }</option>
            <option value="0000">12:00 AM</option>
            <option value="0030">12:30 AM</option>
            <option value="0100">01:00 AM</option>
            <option value="0130">01:30 AM</option>
            <option value="0200">02:00 AM</option>
            <option value="0230">02:30 AM</option>
            <option value="0300">03:00 AM</option>
            <option value="0330">03:30 AM</option>
            <option value="0400">04:00 AM</option>
            <option value="0430">04:30 AM</option>
            <option value="0500">05:00 AM</option>
            <option value="0530">05:30 AM</option>
            <option value="0600">06:00 AM</option>
            <option value="0630">06:30 AM</option>
            <option value="0700">07:00 AM</option>
            <option value="0730">07:30 AM</option>
            <option value="0800">08:00 AM</option>
            <option value="0830">08:30 AM</option>
            <option value="0900">09:00 AM</option>
            <option value="0930">09:30 AM</option>
            <option value="1000">10:00 AM</option>
            <option value="1030">10:30 AM</option>
            <option value="1100">11:00 AM</option>
            <option value="1130">11:30 AM</option>
            <option value="1200">12:00 PM</option>
            <option value="1230">12:30 PM</option>
            <option value="1300">01:00 PM</option>
            <option value="1330">01:30 PM</option>
            <option value="1400">02:00 PM</option>
            <option value="1430">02:30 PM</option>
            <option value="1500">03:00 PM</option>
            <option value="1530">03:30 PM</option>
            <option value="1600">04:00 PM</option>
            <option value="1630">04:30 PM</option>
            <option value="1700">05:00 PM</option>
            <option value="1730">05:30 PM</option>
            <option value="1800">06:00 PM</option>
            <option value="1830">06:30 PM</option>
            <option value="1900">07:00 PM</option>
            <option value="1930">07:30 PM</option>
            <option value="2000">08:00 PM</option>
            <option value="2030">08:30 PM</option>
            <option value="2100">09:00 PM</option>
            <option value="2130">09:30 PM</option>
            <option value="2200">10:00 PM</option>
            <option value="2230">10:30 PM</option>
            <option value="2300">11:00 PM</option>
            <option value="2330">11:30 PM</option>
        </Form.Control>
    );
}

export default TimeOptions;