import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';
function Home(){
    return(
      <div>
        <Navbar  links={{active:{name:'Home',url:'/'},other:[{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}}  brand='true' discuss='true' search='true'/>
        <h2>Home</h2>
      </div>
    )

}



export default Home;
