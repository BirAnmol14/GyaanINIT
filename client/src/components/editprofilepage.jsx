import React from 'react';
import Navbar from './navbar.jsx';
import EditProfile from './editprofile.jsx';

function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-2],url:window.location.href}
}

function editProfile(props){
    return(
        <div>
            <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true' login={props.logged.status} />
            <EditProfile link="/profile/edit"/>
        </div>
    );

}


export default editProfile;
