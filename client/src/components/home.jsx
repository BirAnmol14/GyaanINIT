import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';
import LatestTopics from './latestTopics/latestTopics.jsx';

function Home(props){

    return(
      <div>
        <Navbar  links={{active:{name:'Home',url:'/'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>
    <div className="main_"><h2>Welcome{"   "}
   {
     (props.logged.user)?props.logged.user.name:"User"
   }

    </h2></div>
      <LatestTopics/>
      </div>
    )

}

export default Home;
