import React from 'react';

import global from '../styles/Global.css';
import styles from '../styles/Home.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = { searchTerm: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleExplore = this.handleExplore.bind(this);
   }

   handleSearch() {
      var searchTerm = this.state.searchTerm;
   
      fetch('/search/'+searchTerm, {
         headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
      .then(res => res.json())
      .then(vendors => {
         this.props.history.push({
            pathname:"/vendors",
            state:{
                vendors:vendors
             }
           });
      })
   }

   handleExplore() {
      var self = this;
      fetch('/keywords/random', {
         headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
      .then(res => res.json())
      .then(searchTerm => {
         self.setState({
            searchTerm: searchTerm
         });
         self.handleSearch();
      })

      this.handleExplore = this.handleExplore.bind(this);
   }

   handleChange(e){
      this.setState({
         searchTerm: e.target.value
      });
   }

   render() {
      return(
         <div className={ styles.outerContainer }>
            <h1 className={ global.h1 }>I'm Craving</h1>
            <div className={ styles.searchBar }>
               <InputGroup>
                  <Form.Control id="searchTerm" size="lg" placeholder="Tacos, Elote, Mexican Food, etc." onChange={e => this.handleChange(e)}/>
                  <InputGroup.Append>
                     <Button type="submit" variant="outline-secondary"><i className="fa fa-search"></i></Button>
                  </InputGroup.Append>
               </InputGroup>
            </div>
            <div className={styles.bubble}>Not sure what you want? Click Explore!</div>
            <Button className={ styles.button } variant="primary" onClick={this.handleExplore}>EXPLORE</Button>
            <img className = {styles.img} src="https://media.istockphoto.com/vectors/cartoon-taco-idea-vector-id470002764?k=6&m=470002764&s=612x612&w=0&h=e6n5pIQzGUMuGugDAtZT1sAUY2uokR59CSMP0tAOXG8=" alt="Taco image"></img>
         </div>
      );
   }
}

export default Home;