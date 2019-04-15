import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/ExtraPages.css';
import aboutus from '../../images/aboutus.jpg';

class About extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <h1 className={ global.h2 }>Who we are</h1>
            <div className={ global.p }>
               <div className={ styles.imageDiv } >
                  <img className= { classNames(global.floatingWindow, styles.image) } src={aboutus}/>
               </div>
               <div className={ styles.contentDiv }>
                  Chilimango wants to connect you to local, cheap and delicious food! Our mission is to support the local community and with street vending decriminalized, we want to introduce you to food that was previously hidden in the shadows.
                  <br /><br />
                  The goal of our platform is to connect Angeleno’s and tourists to the local food scene. Street food is tied to the fabrics and diversity of Los Angeles and we would like you to get a taste of authentic LA.
               </div>
            </div>
         </div>
      );
   }
}

export default About;