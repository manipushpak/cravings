import React from 'react';
import styles from '../../styles/Vendors/SearchList.css'

import SearchItem from './SearchItem.jsx'

const SearchList = props => {
   return(
      <div className={ styles.outerContainer }>
         {
            props.searchTerms.map(function(searchTerm, i) {
               return <SearchItem searchTerm={searchTerm} key={i} deleteSearchTerm={props.deleteSearchTerm}/>
            })
         }
      </div>
   );
}

export default SearchList;