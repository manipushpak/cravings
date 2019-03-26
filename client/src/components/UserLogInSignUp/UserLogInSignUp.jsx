import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/UserLogInSignUp/UserLogInSignUp.css';

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
      var outerContainer = classNames(styles.outerContainer, global.floatingWindow);

      return(
         <div className={ outerContainer }>
            <div className={ global.floatingWindow }>
               {!this.state.logInHidden && <LogIn toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden}/>}
            </div>
            <div className={ global.floatingWindow }>
               {!this.state.signUpHidden && <SignUp toggleLogInSignUp ={this.toggleLogInSignUp}
                signUpHidden={this.props.signUpHidden} />}
            </div>
         </div>
      );
   }
}

export default UserLogInSignUp;