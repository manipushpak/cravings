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
                <p className={styles.infoName}>Name of Vendor</p>
                <div className={styles.infoList}>
                    <i className="fa-fw fa fa-map-marker-alt"></i>  Location Address, CA 90007
                    <br />
                    <i className="fa-fw fa fa-clock"></i>  9:00 AM - 5:00 PM
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