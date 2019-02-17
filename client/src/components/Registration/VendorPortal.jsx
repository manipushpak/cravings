import React from 'react';

import { Link } from 'react-router-dom';

const VendorPortal = ({ match }) => {
    return(
        <div>
            <Link to={match.url + "/register"}>Click me to register!</Link>
            <br />
            <Link to={match.url + "/account"}>Click me to view your account!</Link>
        </div>
    );
}

export default VendorPortal;