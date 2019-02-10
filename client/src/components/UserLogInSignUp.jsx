import React from 'react';
import styles from '../styles/UserLogInSignUp.css';

import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';

class UserLogInSignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
      }
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <div className={ styles.logIn }>
               <LogIn></LogIn>
            </div>
            <div className={ styles.signUp }>
               <SignUp></SignUp>
            </div>
         </div>
      );
   }
}

export default UserLogInSignUp;