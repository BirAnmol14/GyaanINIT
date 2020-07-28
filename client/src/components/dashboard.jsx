import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Menu from './dashboardMenu.jsx';

function getActive() {

  var url = window.location.href.split('/');

  return { name: url[url.length - 1], url: window.location.href }
}
function Dashboard() {


  return (
    <div>
      <Navbar links={{ active: getActive(), other: [{ name: 'Home', url: '/' }, { name: 'Past Meets', url: '/pastmeets' }, {name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}] }} brand='true' discuss='true' search='true' />
      <div style={{ marginTop: "90px" }}>
        <SideNavbar links={{ active: { name: '' }, other: [{ name: 'DSA', url: '/dashboard/DSA' }, { name: 'uP', url: '/dashboard/uP' }, { name: 'DBMS', url: '/dashboard/DBMS' }, { name: 'PAVA', url: '/dashboard/PAVA' }, { name: 'POE', url: '/dashboard/POE' }] }} />
        <div style={{ marginLeft: "250px" }}>
          <Menu />



        </div>
      </div>
    </div>
  );

}



export default Dashboard;
