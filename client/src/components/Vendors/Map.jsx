import React from 'react';
import styles from '../../styles/Map.css'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: { lat: 34.0224 , lng: -118.2851 }, 
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
         return <div className={ styles.loadingDiv }>Loading...</div> ;
      }

      const GoogleMapExample = withGoogleMap(props => (
         <GoogleMap
            defaultCenter = { userLocation }
            defaultZoom = { 13 }
         >
            {
               this.props.vendors.map(vendor => {
                  return (<Marker
                     key={ vendor.name }
                     position={ vendor.location.coordinates }
                  ></Marker>);
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