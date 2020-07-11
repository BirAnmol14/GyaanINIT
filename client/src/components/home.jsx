import React from 'react';
import Navbar from './navbar.jsx';
function Home(){
    return(
      <div>
        <Navbar brand='true' join='true' create='true' discuss='true' search='true'/>
        <h2>Home</h2>
      </div>
    )

}



export default Home;
