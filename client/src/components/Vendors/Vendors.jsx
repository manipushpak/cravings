import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';

import Map from './Map.jsx';
import List from './List.jsx';
import ListItem from './ListItem.jsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import ScrollMenu from 'react-horizontal-scrolling-menu';

export const Menu = (list) =>
    list.map(vendor => {
      return <ListItem 
         name={vendor.name} 
         location={vendor.location.address}
         />
});
 
 
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
 
 
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev'});
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });


class Vendors extends React.Component {
   constructor(props) {
      super(props);
      var vendors = typeof this.props.location.state !== 'undefined' && this.props.location.state.vendors !== null
      ? this.props.location.state.vendors : [];
      this.state = {
         vendors: vendors,
         locationProvided: false,
         userLat: "",
         userLong: ""
      };
      this.didProvideLocation = this.didProvideLocation.bind(this);
   }

   didProvideLocation() {
      var self = this;      
      // document.getElementById("userLocationText").innerHTML = "Detecting current location...";
      
      navigator.geolocation.getCurrentPosition(
         position => {
            const { latitude, longitude } = position.coords;
            self.setState({
               locationProvided: true,
               userLat: latitude,
               userLong: longitude
            })
         },
         () => {
            self.setState({
               locationProvided: false
            })
            // document.getElementById("userLocationText").innerHTML = "Detecting current location...";document.getElementById("userLocationText").innerHTML = "Current location cannot be detected. Please try again or type in your street address.";
         }
      );
   }


   render() {
      this.didProvideLocation()
      const menu = Menu(this.state.vendors);
      return(
         <div className={ styles.outerContainer }>
            <h1 className={styles.h1}>Spots near you</h1> <br />
            <div className = {styles.filters}>
               <Form.Row>
                  <Form.Group as={Col} xs={6} sm={2}>
                     <Form.Check label={"Vegetarian"} type="checkbox" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={2}>
                     <Form.Check label={"Open Now"} type="checkbox" />
                  </Form.Group>
               </Form.Row>
            </div>
            <br />
            <div className = {styles.vendorList}>
               <h3>Less than 5 min walk away</h3>
               <ScrollMenu
                  data={menu}
                  arrowLeft={ArrowLeft}
                  arrowRight={ArrowRight}
               />
               <h3>Less than 10 min walk away</h3>
               <ScrollMenu
                  data={menu}
                  arrowLeft={ArrowLeft}
                  arrowRight={ArrowRight}
               />
               <h3>Uber ride away</h3>
               <ScrollMenu
                  data={menu}
                  arrowLeft={ArrowLeft}
                  arrowRight={ArrowRight}
               />
            </div>
            {/* <div className = {styles.vendorList}>
               <List vendors={ this.state.vendors } />
            </div> */}
            <div className={ styles.mapColumn }>
               <Map vendors={ this.state.vendors }/>
            </div>
         </div>
      );
   }
}

export default Vendors;