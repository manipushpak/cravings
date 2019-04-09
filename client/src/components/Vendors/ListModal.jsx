import React from 'react';
import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/ListModal.css';

import { TimeConversion } from '../Registration/TimeOptions.jsx';

import Carousel from 'react-bootstrap/Carousel';

const ListModal = props => {
    const vendor = props.vendor;
    var mapURL = "";

    if (typeof vendor.address.coordinates.lat !== undefined) {
        mapURL += "https://www.google.com/maps/dir/?api=1&travelmode=walking";
        mapURL += "&destination=" + vendor.address.coordinates.lat;
        mapURL += "%2C" + vendor.address.coordinates.lng;
    }

    var vendorTime = '';
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    for (var i=0; i<vendor.hours.length; i++) {
        vendorTime += days[i] + ": ";

        if (vendor.hours[i].open) {
            vendorTime += TimeConversion(vendor.hours[i].startTime) + " - " + TimeConversion(vendor.hours[i].endTime);
        } else {
            vendorTime += "closed";
        }

        if (i !== vendor.hours.length-1) {
            vendorTime += ", ";
        }
    }

    return(
        <div className={styles.listModal}>
            <Carousel className={styles.carouselDiv}>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.vox-cdn.com/thumbor/s9oh8-qPqnyHAJlIjpf2-Eq_8VM=/70x0:1207x853/2570x1446/filters:focal(70x0:1207x853):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49090547/mexicocity_streetfood.0.0.jpg"
                    alt="First slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.vox-cdn.com/thumbor/LXfW3gy1zj20pTloC3vX2bj9CXU=/0x0:2048x1365/1720x0/filters:focal(0x0:2048x1365):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/6136577/MexicoCity_kguamotostada.0.jpg"
                    alt="Second slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.vox-cdn.com/thumbor/vFhrmmkkeHByLHwyYnO4ddA5i-c=/0x0:2048x1365/1720x0/filters:focal(0x0:2048x1365):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/6182925/MexicoCiy_tacos.0.jpg"
                    alt="Third slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
            </Carousel>
            <div className={styles.infoDiv}>
                <div className={styles.infoName}>
                    {vendor.stallName}
                </div>
                <div className={styles.infoList}>
                    
                    {vendor.address.address}
                    <br />
                    {vendorTime}
                    <br />
                    <a href={mapURL}>Show directions on map</a>
                </div>
            </div>
            <button onClick={props.handleHideInfo} className={styles.listModalButton}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}

export default ListModal;