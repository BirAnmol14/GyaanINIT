import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Anounce from './announcement.jsx'
function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-1],url:window.location.href}
}
function discuss(){
    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
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
