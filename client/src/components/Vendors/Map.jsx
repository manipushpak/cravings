import React from 'react';
import styles from '../../styles/Vendors/Map.css';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';


const GoogleMapElement = withGoogleMap(props => (
   <GoogleMap
      defaultCenter = { props.userLocation }
      defaultZoom = { 13 }
   >
   {
      props.vendors.map(vendor => {
         return (
            <Marker
               key={ vendor.name }
               position={ vendor.location.coordinates }
               onClick={ () => props.setActiveKey(vendor.name) }
            > 
            { 
               props.activeKey === vendor.name &&
               <InfoWindow 
                  onCloseClick={ () => props.setActiveKey(null) }
               >
                  <div onClick={ () => props.openModal(vendor.name, vendor.location.address, "9:00 AM - 5:00 PM") }>
                     <p>{ vendor.name }</p>    
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
      const {  loading } = this.state;

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