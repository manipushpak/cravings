import React from 'react';
import styles from '../../styles/Vendors/ListModal.css';

import { TimeConversion } from '../Registration/TimeOptions.jsx';

import Carousel from 'react-bootstrap/Carousel';

const ListModal = props => {
    const vendor = props.vendor;

    var mapURL = "https://www.google.com/maps/dir/?api=1&travelmode=walking";
    mapURL += "&destination=" + vendor.location.coordinates.lat + "%2C" + vendor.location.coordinates.lng;

    var vendorTime = TimeConversion(vendor.hours[0]) + "-" + TimeConversion(vendor.hours[1]);

    return(
        <div className={styles.listModal}>
            <Carousel className={styles.imageDiv}>
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
                    {vendor.name === '' ? "Sample Vendor Name" : vendor.name}
                </p>
                <p>
                    Sample description of vendor here.
                </p>
                <div className={styles.infoList}>
                    <i className="fa-fw fa fa-map-marker-alt"></i>  {vendor.location.address === '' ? "Sample Location Address, CA 90007" : vendor.location.address}
                    <br />
                    <i className="fa-fw fa fa-clock"></i>  {vendorTime === '-' ? "0:00 AM - 0:00 PM" : vendorTime}
                    { console.log(vendor) }
                        <span className={ vendor.open ? styles.storeOpen : styles.storeClosed }>
                        { vendor.open ? " (open now)" : " (closed)" }
                        </span>
                    <br />
                    <a href={mapURL}>Show directions on map</a>
                    
                </div>
            </div>
            <button onClick={props.handleCloseModal} className={styles.listModalButton}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}

export default ListModal;