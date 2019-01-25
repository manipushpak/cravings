import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { userLocation : {lat:38 , lng:38}, loading:true}
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
      const { userLocation, loading} = this.state;
      if (loading) {
         return null;
      }
      const GoogleMapExample = withGoogleMap(props => (
         <GoogleMap
           defaultCenter = { userLocation }
           defaultZoom = { 13 }
         >
            <Marker
                id={"1"}
                key={"key"}
                position={ userLocation }
                title="Current Location"
            >
            </Marker>
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

