import React from 'react';
import styles from '../../styles/Vendors/Map.css';
import mapStyle from '../../../dist/mapStyle.json';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';


const GoogleMapElement = withGoogleMap(props => (
   <GoogleMap
      defaultCenter = { props.userLocation }
      defaultZoom = { 15 }
      defaultOptions = {{styles: mapStyle}}
   >
      <Marker key="userLocation" position={ props.userLocation }></Marker>
   {
      props.vendors.map(vendor => {
         var vendorInfo = vendor.vendorInfo;
         var geocoder = new google.maps.Geocoder();
         let coordinates = {lat: 34.0224 , lng: -118.2851};
         coordinates = geocodeAddress(geocoder, vendorInfo.address.address, coordinates);
         
         return (
            <Marker
               key={ vendor.vendorInfo.stallName }
               position={ coordinates }
               onClick={ () => props.openModal(vendorInfo) }
            > 
            { 
               props.activeKey === vendorInfo.stallName &&
               <InfoWindow 
                  onCloseClick={ () => props.setActiveKey(null) }
               >
                  <div onClick={ () => props.openModal(vendorInfo) }>
                     <p>{ vendorInfo.stallName }</p>    
                  </div>
               </InfoWindow>
            }
            </Marker>
         );
      })
   }
   </GoogleMap>
));


function geocodeAddress(geocoder, address, coordinates) {
   geocoder.geocode({'address': address}, function(results, status) {
     if (status === 'OK') {
         coordinates.lat = results[0].geometry.location.lat();
         coordinates.lng = results[0].geometry.location.lng();
     } else {
      //  alert('Geocode was not successful for the following reason: ' + status);
     }
   });
   return coordinates;
 }


class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: { lat: 34.052234 , lng: -118.243685 }, 
         loading: true,
         infoWindowVisible: false,
         activeKey: null,
         vendors: props.vendors
      }

      this.componentDidMount = this.componentDidMount.bind(this);
      this.setActiveKey = this.setActiveKey.bind(this);
   }

   componentDidMount(props) {
      navigator.geolocation.getCurrentPosition(
         position => {
            const { latitude, longitude } = position.coords;

            this.setState({
               userLocation: { lat: latitude, lng: longitude },
               loading: false
            });
         },
         () => {
            this.setState({ loading: false });
         }
      );
   }

   setActiveKey(key) {
      this.setState({
          activeKey: key,
      });
   }

   render() {
      const { loading } = this.state;

      if (loading) {
         return <div className={ styles.loadingDiv }>Loading...</div> ;
      }

      return(
         <div>
            <GoogleMapElement
               containerElement={ <div style={{ height: '500px', width: '100%' }} /> }
               mapElement={ <div style={{ height: '100%' }} /> }
               activeKey={ this.state.activeKey }
               openModal={ this.props.openModal }
               setActiveKey={ this.setActiveKey }
               userLocation={ this.state.userLocation }
               vendors={ this.state.vendors }
            />
         </div>
      );
   }
}

export default Map;