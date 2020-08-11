import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';

function Home(props){

    return(
      <div>


        <Navbar  links={{active:{name:'Home',url:'/'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status}/>
    <div className="main_"><h2>Welcome{"   "}
   {(props.logged.user)?props.logged.user.name:"User"
   }

      </h2></div>
      </div>
    )

}



export default Home;
