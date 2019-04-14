import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/ExtraPages.css';

class About extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <h1 className={ global.h2 }>Who we are</h1>
            <div className={ global.p }>
               <div className={ styles.imageDiv } >
                  <img className= { classNames(global.floatingWindow, styles.image) } src="https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzAyXFxcLzA5MTA0MTU0XFxcL2lTdG9jay02Mzg2NTExODYuanBnXCIsXCJ3aWR0aFwiOjc2NyxcImhlaWdodFwiOjQzMSxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3Lmhlci5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2hlclxcXC9uby1pbWFnZS5wbmc_dj0yMlwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiJjMjk3MmQ1OTlkNzM4Yzg3MTg5Y2I3NGFmOTQxZjdlMTVlNmJhZDQxIn0=/istock-638651186.jpg" />
               </div>
               <div className={ styles.contentDiv }>
                  Chilimango wants to connect you to local, cheap and delicious food! Our mission is to support the local community and with street vending decriminalized, we want to introduce you to food that was previously hidden in the shadows.
                  <br /><br />
                  The goal of our platform is to connect Angeleno’s and tourists to the local food scene. Street food is tied to the fabrics and diversity of Los Angeles and we would like you to get a taste of authentic LA.
               </div>
            </div>
         </div>
      );
   }
}

export default About;