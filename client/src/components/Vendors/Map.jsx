import React from 'react';
import styles from '../../styles/Vendors/Map.css';
import mapStyle from '../../../dist/mapStyle.json';

import taco from '../../images/taco.svg';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const GoogleMapElement = withGoogleMap(props => (
   <GoogleMap
      defaultCenter = { props.userLocation }
      defaultZoom = { 13 }
      defaultOptions = {{styles: mapStyle}}
   >
      <Marker key="userLocation" position={ props.userLocation }></Marker>
   {
      props.vendors.map(vendor => {
         var vendorInfo = vendor.vendorInfo;
         // var geocoder = new google.maps.Geocoder();
         // let coordinates = {lat: 34.0224 , lng: -118.2851};
         // coordinates = geocodeAddress(geocoder, vendorInfo.address.address, coordinates);
         // console.log(coordinates);

         return (
            <Marker
               key={ vendor._id}
               position={ coordinates }
               onClick={ () => props.openModal(vendorInfo) }
               icon = {taco}
            >
            </Marker>
         );
      })
   }
   </GoogleMap>
));


// function geocodeAddress(geocoder, address, coordinates) {
//    var output = {lat: 34.0224 , lng: -118.2851};

//    var setCoordinates = function (coordinates){
//       output = coordinates;
//       console.log("inside here");
//       console.log("coords in setCoords: " + output.lat + " " + output.lng);
//    };
   
//    geocoder.geocode({'address': address}, function(results, status) {
//      if (status === 'OK') {
//          coordinates.lat = results[0].geometry.location.lat();
//          coordinates.lng = results[0].geometry.location.lng();
//          setCoordinates(coordinates);
//      } else {
//         console.log("error");
//      }
//    });

//    return output;
//  }


class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: { lat: 34.052234 , lng: -118.243685 }, 
         loading: true,
         infoWindowVisible: false,
         activeKey: "vendors",
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
               vendors={ this.props.vendors }
            />
         </div>
      );
   }
}

export default Map;