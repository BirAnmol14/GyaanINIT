import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';
function Home(){
    return(
      <div>
        <Navbar  logged='true'  brand='true' join='true' create='true' discuss='true' search='true'/>
        <h2>Home</h2>
      </div>
    )

}



export default Home;
