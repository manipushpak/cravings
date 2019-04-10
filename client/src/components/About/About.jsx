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
                  Spicy jalapeno bacon ipsum dolor amet chicken short ribs sint aute. Landjaeger et fatback, ullamco quis proident ut cillum meatball veniam. Ullamco tenderloin eiusmod chuck pork chop aute. Beef ribs proident irure magna beef dolor. Leberkas do elit, filet mignon fugiat sirloin pork belly swine minim. Aliquip et salami irure, fugiat biltong pariatur doner fatback ground round enim rump.
                  <br /><br />
                  Brisket sirloin tempor, capicola pig ea proident. Corned beef jerky enim in, minim dolore dolor. Elit shank porchetta turducken, salami ex bresaola andouille flank lorem. Sunt andouille cupidatat laborum shankle officia do porchetta labore commodo leberkas laboris ipsum voluptate esse. Drumstick elit ipsum leberkas pariatur.
               </div>
            </div>
         </div>
      );
   }
}

export default About;