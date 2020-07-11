import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Videoshow from './present.jsx';

function discussVideo(){
    return(
        <div>
            <Navbar logged='true'  brand='true' join='true' create='true' discuss='true' search='true'/>
            <SideNavbar />
        
            <Videoshow />
           
        </div>
    );

}


export default discussVideo;
