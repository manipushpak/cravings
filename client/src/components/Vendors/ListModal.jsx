import React from 'react';
import styles from '../../styles/Vendors/Vendors.css';

const ListModal = props => {
    return(
        <div className={styles.listModal}>
            <p>Modal text!</p>
            <button onClick={props.handleCloseModal} className={styles.listModalButton}>×</button>
        </div>
    );
}

export default ListModal;