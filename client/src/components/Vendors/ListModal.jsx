import React from 'react';
import styles from '../../styles/Vendors/ListModal.css';

import Carousel from 'react-bootstrap/Carousel';

const ListModal = props => {
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
                    {props.name === '' ? "Sample Vendor Name" : props.name}
                </p>
                <div className={styles.infoList}>
                    <i className="fa-fw fa fa-map-marker-alt"></i>  {props.address === '' ? "Sample Location Address, CA 90007" : props.address}
                    <br />
                    <i className="fa-fw fa fa-clock"></i>  {props.hours === '' ? "0:00 AM - 0:00 PM" : props.hours}
                        <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                        { props.open ? " (open now)" : " (closed)" }
                        </span>
                </div>
            </div>
            <button onClick={props.handleCloseModal} className={styles.listModalButton}>
                <i class="fas fa-times"></i>
            </button>
        </div>
    );
}

export default ListModal;