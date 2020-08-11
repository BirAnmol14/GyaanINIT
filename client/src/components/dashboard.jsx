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
    props.logged.status===true?
    <div>
      <Navbar links={{ active: getActive(), other: [{ name: 'Home', url: '/' }, { name: 'Past Meets', url: '/pastmeets' }, {name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}] }} brand='true' discuss='true' search='true' login={props.logged.status}/>
      <div style={{ marginTop: "90px" }}>
        <SideNavbar links={{ active: { name: 'DASHBOARD' }, other: [{ name: 'DASHBOARD', url: '/Dashboard' },{ name: 'DSA', url: '/Dashboard/DSA' }, { name: 'uP', url: '/Dashboard/uP' }, { name: 'DBMS', url: '/Dashboard/DBMS' }, { name: 'PAVA', url: '/Dashboard/PAVA' }, { name: 'POE', url: '/Dashboard/POE' }] }} />
        <div style={{marginLeft: "210px" }}>
        <h5 style={{color:"grey"}}>Hello { "  "}
          {(props.logged.user)?
           props.logged.user.name:null}
           , welcome back to the Dashboard
           </h5>
           </div>
        <div style={{ marginLeft: "250px" }}>


           <div style={{backgroundColor:'hsla(0, 0%, 0%, 0.3)', width:'90%',marginLeft:'5%',marginRight:'5%',boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"25px 25px"}}>
          <Menu />
          </div>


        </div>
      </div>
    </div>
    :
    <div/>
  );

}



export default Dashboard;
