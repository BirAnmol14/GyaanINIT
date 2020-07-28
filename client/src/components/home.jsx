import React from 'react';
import Navbar from './navbar.jsx';
import './home.css';
import ServerRoutes from './ServerRoutes.js';
function Home(){
  var [logged,setLogged]=React.useState('false');
  

  async function loggedStatus(){
    
    
    const response=await fetch(ServerRoutes.loggedIn,{
      method: 'GET',
      credentials: 'include'
    })
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
      
        setLogged('true');
        return;
        
        
      }else{
          setLogged('false');
          return;
      }
    }else{
      alert('Error '+status);
    }
  
  }
    
  React.useEffect(() => {
   
    loggedStatus();
  });

    return(
      <div>
    

        <Navbar  links={{active:{name:'Home',url:'/'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}}  brand='true' discuss='true' search='true' login={logged}/>
        <div class="main_"><h2>Home</h2></div>
      </div>
    )

}



export default Home;
