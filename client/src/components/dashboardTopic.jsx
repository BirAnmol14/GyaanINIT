import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Anounce from './announcement.jsx';

function getActive(){

  var url=window.location.href.split('/');

  return {name:url[url.length-1 ],url:window.location.href}
}
function DashboardTopic(){


    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true'/>
        <div style={{marginTop:"90px"}}>
        <SideNavbar links={{active:{name:getActive().name},other:[{name:'DSA',url:'/dashboard/DSA'},{name:'uP',url:'/dashboard/uP'},{name:'DBMS',url:'/dashboard/DBMS'},{name:'PAVA',url:'/dashboard/PAVA'},{name:'POE',url:'/dashboard/POE'}]}}/>
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
