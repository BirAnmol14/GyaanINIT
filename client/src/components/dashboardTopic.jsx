import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Anounce from './announcement.jsx';

import ServerRoutes from './ServerRoutes.js';
function getActive(){

  var url=window.location.href.split('/');

  return {name:url[url.length-1],url:window.location.href}
}
function DashboardTopic(props){

  
    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true' login={props.logged.status}/>
        <div style={{marginTop:"90px"}}>
        <SideNavbar links={{active:{name:getActive().name},other:[{name:'DSA',url:'/Dashboard/DSA'},{name:'uP',url:'/Dashboard/uP'},{name:'DBMS',url:'/Dashboard/DBMS'},{name:'PAVA',url:'/Dashboard/PAVA'},{name:'POE',url:'/Dashboard/POE'}]}}/>
        <div className="panel-group" id="accordion">
       <Anounce/>
       <Anounce/>
       <Anounce/>
       <Anounce/>
       <div style={{marginLeft:"85%",marginRight:"0%"}}>
        <br></br>
<br>
</br>

                                        <div class="row">
                                            <div class="col-md-12">

                                            <button type="button" class="btn btn-danger btn-lg m-1"><span class="glyphicon glyphicon-signal glyphsize green"></span>Leave Course </button>
                                            </div>
                                        </div>
                                        </div>


        </div>

        </div>

      </div>
    );

}



export default DashboardTopic;
