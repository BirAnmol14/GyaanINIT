import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Articlepost from './articlePost.jsx';
function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-2],url:window.location.href}
}

function presentations(prop){
    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
        <SideNavbar />
          <Articlepost link="https://www.ucm.es/data/cont/docs/119-2014-02-19-3.%20MidsummerNightDream.pdf" read="Open Presentation" />
      </div>
    );

}



export default presentations;
