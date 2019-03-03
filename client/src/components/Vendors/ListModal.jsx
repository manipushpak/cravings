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
                <h3>Name of Vendor</h3>
                <p>
                    Location Address, CA 90007
                    <br />
                    <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                    { props.open ? "open " : "closed " }
                    </span>
                    9:00 AM - 5:00 PM
                </p>
                <p>
                    Location Address, CA 90007
                    <br />
                    <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                    { props.open ? "open " : "closed " }
                    </span>
                    9:00 AM - 5:00 PM
                </p>
                <p>
                    Location Address, CA 90007
                    <br />
                    <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                    { props.open ? "open " : "closed " }
                    </span>
                    9:00 AM - 5:00 PM
                </p>
                <p>
                    Location Address, CA 90007
                    <br />
                    <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                    { props.open ? "open " : "closed " }
                    </span>
                    9:00 AM - 5:00 PM
                </p>
                <p>
                    Location Address, CA 90007
                    <br />
                    <span className={ props.open ? styles.storeOpen : styles.storeClosed }>
                    { props.open ? "open " : "closed " }
                    </span>
                    9:00 AM - 5:00 PM
                </p>
            </div>
            <button onClick={props.handleCloseModal} className={styles.listModalButton}>
                <i class="fas fa-times"></i>
            </button>
        </div>
    );
}

export default ListModal;