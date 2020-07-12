import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Articlepost from './articlePost.jsx'


function Article(){
    return(
      <div>
        <Navbar logged='true' brand='true' join='true' create='true' discuss='true' search='true'/>
        <SideNavbar />
          <Articlepost link="/discuss/engineering/articles/post" read="Read..."/>
          <Articlepost link="/discuss/engineering/articles/post" read="Read..."/>
          <Articlepost link="/discuss/engineering/articles/post" read="Read..."/>
        
      </div>
    );

}



export default Article;