import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Articlepost from './articlePost.jsx'

function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-2],url:window.location.href}
}

function Article(){
    return(
      <div>
        <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
        <SideNavbar />
          <Articlepost link="/discuss/Engineering/articles/post" read="Read..."/>
          <Articlepost link="/discuss/Engineering/articles/post" read="Read..."/>
          <Articlepost link="/discuss/Engineering/articles/post" read="Read..."/>

      </div>
    );

}



export default Article;
