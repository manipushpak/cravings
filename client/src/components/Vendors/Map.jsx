import React from 'react';
import styles from '../../styles/Vendors/Map.css';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Geocode from 'react-geocode';


const GoogleMapElement = withGoogleMap(props => (
   <GoogleMap
      defaultCenter = { props.userLocation }
      defaultZoom = { 13 }
   >
   {
      props.vendors.map(vendor => {
         var vendorInfo = vendor.vendorInfo;
         console.log(vendorInfo.address.coordinates);
         return (
            <Marker
               key={ vendorInfo.stallName }
               position={ vendorInfo.address.coordinates }
               onClick={ () => props.setActiveKey(vendorInfo.stallName) }
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

class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = { 
         userLocation: { lat: 34.0224 , lng: -118.2851 }, 
         loading: true,
         markerIcon: {
            url: 'data:image/jpeg;base64,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',
            scaledSize: new google.maps.Size(50, 50),
         },
         infoWindowVisible: false,
         activeKey: null
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