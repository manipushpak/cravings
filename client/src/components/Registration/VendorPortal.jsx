import React from 'react';

import { Link, Route } from 'react-router-dom';
import Registration from './Registration.jsx';

const VendorPortal = ({ match }) => {
    return(
        <div>
            <Link to={match.url + "/register"}>Click me to register!</Link>
            <br />
            <Link to={match.url + "/account"}>Click me to view your account!</Link>
            <hr />
            <Route path={match.url + "/register"} render={() => <Registration isEdit={false} isView={false}/>} />
            <Route path={match.url + "/account"} render={() => <Registration isEdit={false} isView={true}/>} />
        </div>
    );
}

export default VendorPortal;