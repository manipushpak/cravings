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
            <div className={ classNames(global.p, styles.contentDiv) }>
                <ul className={ styles.faqDiv }>
                    <Question 
                        question="Who are you?"
                        answer="Cupcake ipsum dolor sit amet apple pie powder carrot cake. Chocolate cake sugar plum dragée. Cupcake cookie toffee caramels tart soufflé pudding cheesecake tootsie roll. Tootsie roll pastry sugar plum powder muffin."
                    />
                    <Question 
                        question="How are you?"
                        answer="Jelly-o soufflé wafer. Soufflé cookie fruitcake cookie pudding lemon drops pudding. Sesame snaps bear claw croissant lemon drops lollipop chocolate cake cheesecake sweet. Cheesecake gingerbread sweet." 
                    />
                    <Question 
                        question="What are you?"
                        answer="Powder pastry pie pudding pudding. Muffin chocolate cake biscuit toffee brownie pastry tart. Liquorice sweet roll jelly-o fruitcake. Caramels jelly chocolate bar bear claw." 
                    />
                    <Question 
                        question="Why are you?"
                        answer="Chocolate macaroon jelly-o tart jelly jelly cake fruitcake apple pie. Chocolate cake carrot cake sweet jelly beans pie jujubes croissant danish. Sweet ice cream ice cream chocolate cake. Cake jelly beans powder."
                    />
                    <Question 
                        question="When are you?"
                        answer="Donut danish gummi bears cookie tiramisu cupcake. Marzipan jelly-o gummi bears danish dessert sweet roll. Jelly-o pastry muffin halvah jelly-o tootsie roll croissant."
                    />
                </ul>
            </div>
         </div>
      );
   }
}

export default Faq;