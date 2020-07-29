import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Menu from './dashboardMenu.jsx';


function getActive() {

  var url = window.location.href.split('/');

  return { name: url[url.length - 1], url: window.location.href }
}
function Dashboard(props) {

 
  return (
    <div>
      <Navbar links={{ active: getActive(), other: [{ name: 'Home', url: '/' }, { name: 'Past Meets', url: '/pastmeets' }, {name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}] }} brand='true' discuss='true' search='true' login={props.logged.status}/>
      <div style={{ marginTop: "90px" }}>
        <SideNavbar links={{ active: { name: '' }, other: [{ name: 'DSA', url: '/Dashboard/DSA' }, { name: 'uP', url: '/Dashboard/uP' }, { name: 'DBMS', url: '/Dashboard/DBMS' }, { name: 'PAVA', url: '/Dashboard/PAVA' }, { name: 'POE', url: '/Dashboard/POE' }] }} />
        <div style={{ marginLeft: "250px" }}>
         <center> <h5>Welcome {"  "}
          {(props.logged.user)?
           props.logged.user.name:null}
           </h5>
           </center>
           <div style={{backgroundColor:'hsla(0, 0%, 0%, 0.3)', width:'1200px',marginLeft:'160px'}}>
          <Menu />
          </div>


        </div>
      </div>
    </div>
  );

}



export default Dashboard;
