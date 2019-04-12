import React from 'react';

import classNames from 'classnames';
import global from '../../styles/Global.css';
import styles from '../../styles/ExtraPages.css';

class Mission extends React.Component {
   constructor(props) {
      super(props);
      this.state = { };
   }

   render() {
      return(
         <div>
            <h1 className={ global.h2 }>What we believe in</h1>
            <div className={ global.p }>
               <div className={ styles.imageDiv } >
                  <img className= { classNames(global.floatingWindow, styles.image) } src="https://cdn.vox-cdn.com/thumbor/l2-VqMTGl88gBys1EqXhuQKQ_CY=/0x0:2048x1365/1720x0/filters:focal(0x0:2048x1365):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/6197223/mexicocity_friedtamales.0.jpg" />
               </div>
               <div className={ styles.contentDiv }>
                    Bacon ipsum dolor amet flank ground round ham buffalo. Frankfurter leberkas prosciutto chicken beef ribs beef. Bresaola pork belly shankle drumstick. Tenderloin shankle meatball, shank tail salami tri-tip beef ribs hamburger t-bone pork belly tongue pork chop corned beef turkey.
                    <br /><br />
                    Shankle strip steak capicola cow landjaeger. Sausage pork belly pork loin strip steak chuck tongue bacon frankfurter turducken beef. Beef venison brisket, ball tip shoulder t-bone kevin boudin porchetta pancetta. Brisket filet mignon beef ribs bresaola pork belly shoulder kielbasa.
                    <br /><br />
                    Ham hock burgdoggen porchetta turducken shankle flank short loin swine buffalo drumstick cupim short ribs boudin. Ball tip ham sausage meatloaf, porchetta alcatra shank boudin chicken tenderloin kielbasa turducken short loin frankfurter spare ribs. Tenderloin jowl tail ham hock buffalo filet mignon pork hamburger pork loin spare ribs swine bacon leberkas. Biltong alcatra corned beef, kevin pork loin chicken shoulder venison pastrami drumstick bacon hamburger. Shankle swine ball tip pork chop.
                    <br /><br />
                    <a href="https://www.nytimes.com/interactive/2019/01/11/multimedia/la-street-vendors.html?fallback=0&recId=1G9VqQw09PPZ2h3ehWp8iCeqSmJ&locked=0&geoContinent=NA&geoRegion=CA&recAlloc=random&geoCountry=US&blockId=signature-journalism-random&imp_id=240994463&action=click&module=editorsPicks&pgtype=Article&region=Footer">Learn more about LA Vendors on New York Times!</a>
                </div>
            </div>
         </div>
      );
   }
}

export default Mission;