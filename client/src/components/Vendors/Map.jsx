import React from 'react';
import styles from '../../styles/Vendors/Map.css';
import mapStyle from '../../../dist/mapStyle.json';

import taco from '../../images/taco.svg';
import burrito from '../../images/burrito.svg';
import fruit from '../../images/fruit.svg';
import gelato from '../../images/gelato.svg';
import juice from '../../images/juice.svg';
import multiple from '../../images/multiple.svg';
import pupusa from '../../images/pupusa.svg';
import quesadilla from '../../images/quesadilla.svg';
import unknownItem from '../../images/unknownItem.svg';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { createMuiTheme } from '@material-ui/core';

const GoogleMapElement = withGoogleMap(props => (
   <GoogleMap
      defaultCenter = { props.userLocation }
      defaultZoom = { 10 }
      defaultOptions = {{styles: mapStyle, gestureHandling: "cooperative"}}
   >
      <Marker key="userLocation" position={ props.userLocation }></Marker>
   {
      props.vendors.map(vendor => {
         return (
            <Marker
               key={ vendor._id}
               position={ vendor.vendorInfo.address.coordinates }
               onClick={ () => props.openModal(vendor.vendorInfo) }
               icon= {whichEmoji(vendor)}
            >
            </Marker>
         );
      })
   }
   </GoogleMap>
));

function whichEmoji(vendor){
   var keywords = vendor.vendorInfo.keywords;
   if(keywords.length < 1){
      return unknownItem;
   }
   var keyword = keywords[0].toUpperCase();
   if(keywords.length > 1){
      return multiple;
   }
   else if(keyword.includes("TACO")){
      return taco;
   }
   else if(keyword.includes("BURRITO")){
      return burrito;
   }
   else if(keyword.includes("JUICE")){
      return juice;
   }
   else if(keyword.includes("PUPUSA")){
      return pupusa;
   }
   else if(keyword.includes("GELATO")){
      return gelato;
   }
   else if(keyword.includes("FRUIT")){
      return fruit;
   }
   else if(keyword.includes("QUESADILLA")){
      return quesadilla;
   }
   else{
      return unknownItem;
   }
}

class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: { lat: 34.052234 , lng: -118.243685 }, 
         loading: true,
         infoWindowVisible: false,
         activeKey: "vendors",
         vendorsInDistance: this.props.vendorsInDistance,
         distance: this.props.distance[0],
         isMounted: false
      }

      this.componentDidMount = this.componentDidMount.bind(this);
      this.setActiveKey = this.setActiveKey.bind(this);
      this.emptyVendorsList = this.emptyVendorsList.bind(this);
   }

   emptyVendorsList(){
      this.setState({
         vendorsInDistance: []
      })
   }

   componentDidMount(props) {
      navigator.geolocation.getCurrentPosition(
         position => {
            const { latitude, longitude } = position.coords;

            this.setState({
               userLocation: { lat: latitude, lng: longitude },
               loading: false,
               isMounted: true,
               distance: this.props.distance[0]
            });
         },
         () => {
            this.setState({ loading: false });
         }
      );  
      if(this.props.vendorsChanged){
         this.emptyVendorsList();
         nextProps.changeVarBack;
      } 
   }

   
   componentWillUnmount(){
      this.state.isMounted = false;
   }

   componentWillReceiveProps(nextProps){
      this.setState({
         distance: nextProps.distance
      })
   }

   setActiveKey(key) {
      this.setState({
          activeKey: key,
      });
   }

   render() {
      const { loading } = this.state;

      if (loading) {
         return <div className={ styles.loadingDiv }>Loading...</div>;
      }

      this.props.vendors.map(vendor => {
         var vendorInfo = vendor.vendorInfo;
         var directionsService = new google.maps.DirectionsService();
         var request = {
            origin: vendorInfo.address.address,
            destination: this.state.userLocation,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
         };
         var self = this;
         directionsService.route(request, function(response, status){
            if(status == google.maps.DirectionsStatus.OK){
               if(response.routes[0].legs[0].distance.value/ 1609.34 <= self.state.distance){
                  // console.log(response.routes[0].legs[0].distance.value/ 1609.34);
                  var vendors = self.state.vendorsInDistance;
                  vendors.indexOf(vendor) === -1 ? vendors.push(vendor) : console.log("exists");
                  self.setState({
                     vendorsInDistance: vendors
                  });
               }
               else{
               }
            }
            else{
               // console.log("directions service encountered an error");
            }
         });
      })

      return(
         <div>
            <GoogleMapElement
               containerElement={ <div style={{ height: '500px', width: '100%' }} /> }
               mapElement={ <div style={{ height: '100%' }} /> }
               activeKey={ this.state.activeKey }
               openModal={ this.props.openModal }
               setActiveKey={ this.setActiveKey }
               userLocation={ this.state.userLocation }
               vendors={ this.state.vendorsInDistance }
            />
         </div>
      );
   }
}

export default Map;