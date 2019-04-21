import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/ExtraPages.css';

import Question from './Question.jsx';

class Faq extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <h1 className={ global.h2 }>FAQ</h1>
            <div className={ styles.contentDiv }>
                <ul className={ styles.faqDiv }>
                    <Question 
                        question="How are vendors located?"
                        answer="Currently vendors log into a portal that detects their GPS coordinates. Once vendors are closed for the day, their location is take offline."
                    />
                    <Question 
                        question="Is this information real time?"
                        answer="Yes! This information is real time and vendors update their location as the move around Los Angeles."
                    />
                    <Question 
                        question="I am a vendor, how can I sign up?"
                        answer="We would love to have you on chilimango.la! You can sign up on: www.chilimango.la/vendorportal or you can send and SMS to the number 435 saying “Hello”" 
                    />
                    <Question 
                        question="Does this only work in Los Angeles?"
                        answer="Yes, currently this only works in Los Angeles are we are fairly new. We are hoping to expand this into other cities and are always open to partnership opportunities. You can email: nnagda@usc.edu for more information"
                    />
                    <Question 
                        question="Is street food safe to eat?"
                        answer="Street vendors actually have health permits like restaurant establishments. Each vendor has a health grade which can see on their cart. The locations listed on our plattform all have a health standard of A."
                    />
                </ul>
            </div>
         </div>
      );
   }
}

export default Faq;