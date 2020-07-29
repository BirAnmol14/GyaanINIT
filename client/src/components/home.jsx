import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';

function Home(props){

    return(
      <div>
    

        <Navbar  links={{active:{name:'Home',url:'/'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status}/>
    <div class="main_"><h2>Welcome{"   "}
   {(props.logged.user)?props.logged.user.name:"User"
   }

      </h2></div>
      </div>
    )

}



export default Home;
