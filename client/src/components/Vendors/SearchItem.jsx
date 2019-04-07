import React from 'react';
import styles from '../../styles/Vendors/SearchItem.css';


const SearchItem = props => {
    return(
        <div className={ styles.outerContainer }>
            <button type="button" className={styles.round}>
            <DeleteSearchTermButton deleteSearchTerm={props.deleteSearchTerm} searchTerm={props.searchTerm}/>
            {props.searchTerm}</button>
        </div>
    );
}

const DeleteSearchTermButton = props => {
    return (
        <a className={ styles.aTag } onClick={() => { props.deleteSearchTerm(props.searchTerm)}} >
            <i className="fas fa-times"></i>
        </a>
    );
}


export default SearchItem;