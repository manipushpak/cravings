import React from 'react';
import styles from '../styles/UserLogInSignUp.css';

import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';

class UserLogInSignUp extends React.Component {
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
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.login }>
               {!this.state.logInHidden && <LogIn toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden}/>}
            </div>
            <div className={ styles.signup }>
               {!this.state.signUpHidden && <SignUp toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden} />}
            </div>
         </div>
      );
   }
}

export default UserLogInSignUp;