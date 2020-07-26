import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Anounce from './announcement.jsx';

function getActive(){

  var url=window.location.href.split('/');

  return {name:url[url.length-1],url:window.location.href}
}
function Dashboard(){


    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
        <div style={{marginTop:"90px"}}>
        <SideNavbar links={{active:{name:''},other:[{name:'DSA',url:'/dashboard/DSA'},{name:'uP',url:'/dashboard/uP'},{name:'DBMS',url:'/dashboard/DBMS'},{name:'PAVA',url:'/dashboard/PAVA'},{name:'POE',url:'/dashboard/POE'}]}}/>
        <div className="panel-group" id="accordion">
        <div className="mx-auto">
                <div className="card text">
                <div className="card-header">
                   Latest updates posts
                </div>
                <div className="card-body">
                   maybe links of meets,posts, announcements of all courses one is registered into.
                </div>
                
                </div>
            </div>
            <div className="mx-auto">
                <div className="card text">
                <div className="card-header">
                   Latest updates posts
                </div>
                <div className="card-body">
                   maybe links of meets,posts, announcements of all courses one is registered into.
                </div>
                
                </div>
            </div>
            <div className="mx-auto">
                <div className="card text">
                <div className="card-header">
                   Latest updates posts
                </div>
                <div className="card-body">
                   maybe links of meets,posts, announcements of all courses one is registered into.
                </div>
                
                </div>
            </div>
        </div>
       
        </div>

      </div>
    );

}



export default Dashboard;
