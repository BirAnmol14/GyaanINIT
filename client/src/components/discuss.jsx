import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Anounce from './announcement.jsx'

function discuss(){
    return(
      <div>
        <Navbar brand='true' join='true' create='true' discuss='true' search='true'/>
        <SideNavbar />
        <div class="panel-group" id="accordion">
          <Anounce />
          <Anounce />
          <Anounce />
          <Anounce />
          <Anounce />
        </div>
        
      </div>
    );

}



export default discuss;
