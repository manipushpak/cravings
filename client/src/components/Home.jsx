import React from 'react';

import styles from '../styles/Home.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   // handleInputChange(e) {
   //    var searchTerm = e.target.value;
   //    if(searchTerm == ""){
   //       fetch('/vendors')
   //       .then(res => res.json())
   //       .then(vendors => {
   //          this.setState({ vendors })
   //       })
   //    }
   //    else{
   //       fetch('/vendor/keywords/'+searchTerm, {
   //          headers : { 
   //            'Content-Type': 'application/json',
   //            'Accept': 'application/json'
   //          }
   //       })
   //       .then(res => res.json())
   //       .then(vendors => {
   //          if(vendors != null){
   //             this.setState({ vendors })
   //          }
   //       })
   //    }
   //  }

   render() {
      return(
         <div className={styles.outerContainer}>
            <h1 className={styles.h1}>I'm Craving...</h1>
            <div className={ styles.searchBar }>
               <InputGroup>
                  <Form.Control controlId="searchTerm" size="lg" placeholder="Tacos, Elote, Mexican Food, etc." onChange={e => this.handleInputChange(e)}/>
                  <button type="submit"><i class="fa fa-search"></i></button>
               </InputGroup>
            </div>
            <div className={styles.bubble}>Not sure what you want? Click below!</div>
            <Button className={ styles.button } variant="primary">Surprise me!</Button>
            <img className = {styles.img} src="https://media.istockphoto.com/vectors/cartoon-taco-idea-vector-id470002764?k=6&m=470002764&s=612x612&w=0&h=e6n5pIQzGUMuGugDAtZT1sAUY2uokR59CSMP0tAOXG8=" alt="Taco image"></img>
         </div>
      );
   }
}

export default Home;