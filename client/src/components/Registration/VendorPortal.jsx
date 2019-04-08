import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Registration/VendorPortal.css';

import VendorLogIn from './VendorLogIn.jsx';
import VendorSignUp from './VendorSignUp.jsx';

class VendorPortal extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         logInHidden: false,
         signUpHidden: true
      }
      this.toggleLogInSignUp = this.toggleLogInSignUp.bind(this);
   }

   toggleLogInSignUp () {
      this.setState({
        logInHidden: !this.state.logInHidden,
        signUpHidden: !this.state.signUpHidden
      });
   }

   render() {
      var outerContainer = classNames(styles.outerContainer, global.floatingWindow);

      return(
         <div className={ outerContainer }>
            <div>
               {!this.state.logInHidden && <VendorLogIn toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden}/>}
            </div>
            <div>
               {!this.state.signUpHidden && <VendorSignUp toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden} />}
            </div>
         </div>
      );
   }
}

export default VendorPortal;