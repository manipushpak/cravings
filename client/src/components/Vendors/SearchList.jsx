import React from 'react';
import styles from '../../styles/Vendors/List.css'

import SearchItem from './SearchItem.jsx'

const SearchList = props => {
   console.log("from searchlist:  "+ props.searchTerms);
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