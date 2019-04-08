import React from 'react';
import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/Vendors/ListModal.css';

import { TimeConversion } from '../Registration/TimeOptions.jsx';

import Carousel from 'react-bootstrap/Carousel';

const ListModal = props => {
    const vendor = props.vendor;
    console.log(vendor);
    var mapURL = "";

    // if (typeof vendor.address.coordinates.lat !== undefined) {
    //     mapURL += "https://www.google.com/maps/dir/?api=1&travelmode=walking";
    //     mapURL += "&destination=" + vendor.address.coordinates.lat;
    //     mapURL += "%2C" + vendor.address.coordinates.lng;
    // }
    

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
            vendorTime += "\n\n";
        }
    }

    return(
        <div className={styles.listModal}>
            <Carousel className={styles.carouselDiv}>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg"
                    alt="First slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg"
                    alt="Third slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src="https://www.thehappycatsite.com/wp-content/uploads/2017/10/best-treats-for-kittens.jpg"
                    alt="Third slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
            </Carousel>
            <div className={styles.infoDiv}>
                <p className={styles.infoName}>
                    {vendor.stallName}
                </p>
                <div className={styles.infoList}>
                    <i className="fa-fw fa fa-map-marker-alt"></i>  {vendor.address.address}
                    <br />
                    <i className="fa-fw fa fa-clock"></i>  {vendorTime}
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