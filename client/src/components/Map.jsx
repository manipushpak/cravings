import React from 'react';
import styles from '../styles/Map.css'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: {lat:34.0224 , lng:-118.2851}, 
         loading: true
      }
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

   render() {
      const { userLocation, loading } = this.state;
      
      if (loading) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
         // TODO: Should replace with something signaling that map is loading
>>>>>>> component fixes
=======
>>>>>>> small fix on form check
=======
>>>>>>> 4035363a3819c32e4eb1bf1676927b8245c99be5
         return <div className={ styles.loadingDiv }>Loading...</div> ;
      }

      const GoogleMapExample = withGoogleMap(props => (
         <GoogleMap
            defaultCenter = { userLocation }
            defaultZoom = { 13 }
         >
            {
               this.props.vendors.map(vendor => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  return (<Marker
                     key={ vendor.name }
                     position={ vendor.location.coordinates }
                  ></Marker>);
=======
                  return (<Marker key={ vendor.name } position={ vendor.coords }></Marker>);
>>>>>>> passing ints for timeoptions
=======
                  return (<Marker key={ vendor.name } position={ vendor.coords }></Marker>);
>>>>>>> ahhh
=======
                  return (<Marker key={ vendor.name } position={ vendor.coords }></Marker>);
>>>>>>> merge conflectssszsz
=======
                  return (<Marker key={ vendor.name } position={ vendor.coords }></Marker>);
>>>>>>> 4035363a3819c32e4eb1bf1676927b8245c99be5
               })
            }            
         </GoogleMap>
      ));

      return(
         <div>
            <GoogleMapExample
               containerElement={ <div style={{ height: '500px', width: '100%' }} /> }
               mapElement={ <div style={{ height: '100%' }} /> }
            />
         </div>
      );
   }
}

export default Map;