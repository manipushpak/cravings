import React from 'react';

import global from '../styles/Global.css';
import styles from '../styles/Home.css';

import mango from '../images/mango.gif';

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

   handleChange(e){
      this.setState({
         searchTerm: e.target.value
      });
   }
   
   handleSearch() {
      var searchTerm = [this.state.searchTerm];
   
      fetch('/search', {
         method: 'POST',
         body: JSON.stringify({
            terms: searchTerm
         }),
         headers:{"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(vendors => {
         this.props.history.push({
            pathname:"/vendors",
            state:{
                vendors:vendors,
                searchTerm: this.state.searchTerm
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
   }
   
   render() {
      return(
         <div className={ styles.outerContainer }>
            <h1 className={ global.h1 }>I'm craving</h1>
            <InputGroup className={ styles.searchBar }>
               <InputGroup.Prepend>
                  <Button type="submit" className={ styles.searchButton } onClick={this.handleSearch} variant="outline">
                     <i className="fa fa-search"></i>
                  </Button>
               </InputGroup.Prepend>
               <Form.Control className={ styles.searchInput } id="searchTerm" size="lg" placeholder="Tacos, Elote, Mexican Food, etc." onChange={e => this.handleChange(e)}/>
            </InputGroup>
            <div className={ styles.bubble }>Not sure what you want? Click me to explore!</div>
            <img className={ styles.img } onClick={ this.handleExplore } src={mango} alt="Taco image"></img>
         </div>
      );
   }
}

export default Home;