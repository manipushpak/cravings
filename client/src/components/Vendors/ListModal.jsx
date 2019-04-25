import React from 'react';
import styles from '../../styles/Vendors/ListModal.css';

import vendorfood1 from '../../images/vendorfood1.png';
import vendorfood2 from '../../images/vendorfood2.png';
import vendorfood3 from '../../images/vendorfood3.png';

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

    const days = ["M", "T", "W", "T", "F", "S", "S"];
    var i = 0;

    var vendorTime = vendor.hours.map(hour => {
        var vt = days[i++] + ": ";
        
        if (hour.open) {
            vt += TimeConversion(hour.startTime) + " - " + TimeConversion(hour.endTime);
        } else {
            vt += "closed";
        }

        return vt;
    })

    return(
        <div className={styles.listModal}>
            <Carousel className={styles.carouselDiv}>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src={vendorfood1}
                    alt="First slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src={vendorfood2}
                    alt="Second slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item style={{height: '100%'}}>
                    <img
                    className="d-block w-100"
                    src={vendorfood3}
                    alt="Third slide"
                    style={{objectFit: 'cover', height: '100%'}}
                    />
                </Carousel.Item>
            </Carousel>
            <div className={styles.infoDiv}>
                <div className={styles.infoName}>
                    {vendor.stallName}
                </div>
                <div className={styles.infoAddress}>
                    {vendor.address.address} <br />
                    {
                        typeof vendor.address.coordinates.lat !== undefined
                        &&
                        <a href={mapURL}>Show directions on map</a>
                    }
                </div>
                <div className={styles.infoTime}>
                {
                    vendorTime.map(time => {
                        return (
                            <div>{time}</div>
                        );
                    })
                }
                </div>
            </div>
            <button onClick={props.handleHideInfo} className={styles.listModalButton}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}

export default ListModal;