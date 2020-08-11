import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';

import Anounce from './announcement.jsx';

function getActive(){

  var url=window.location.href.split('/');

  return {name:url[url.length-1],url:window.location.href}
}
function Discuss(props){



    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}} brand='true' discuss='true' search='true' login={props.logged.status}/>
        <div style={{marginTop:"90px"}}>
        <SideNavbar links={{active:{name:'Posts'},other:[{name:'Posts',url:'/discuss/'+getActive().name},{name:'Videos',url:'/discuss/'+getActive().name+'/videolectures'},{name:'eBooks',url:'/discuss/'+getActive().name+'/ebooks'},{name:'Articles',url:'/discuss/'+getActive().name+'/articles'},{name:'Presentations',url:'/discuss/'+getActive().name+'/presentations'}]}}/>
        <div className="panel-group" id="accordion">
          <Anounce />
          <Anounce />
          <Anounce />
          <Anounce />
          <Anounce />
        </div>
        </div>

      </div>
    );

}



export default Discuss;
