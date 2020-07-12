import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import MyPdfViewer from './presentations.jsx'
import Articlepost from './articlePost.jsx';


function presentations(prop){
    return(
      <div>
        <Navbar logged='true' brand='true' join='true' create='true' discuss='true' search='true'/>
        <SideNavbar />
          <Articlepost link="https://www.ucm.es/data/cont/docs/119-2014-02-19-3.%20MidsummerNightDream.pdf" read="Open Presentation" />
      </div>
    );

}



export default presentations;