import React from 'react';
import Navbar from './navbar.jsx';
import ServerRoutes from './ServerRoutes.js';
function PastMeets(){
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

        <Navbar links={{active:{name:'Past Meets',url:'/pastmeets'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true'  login={logged}/>
       <div style={{marginTop:"110px"}}>
        <div class=" card text-left mb-2" style={{width: "", backgroundColor:"", marginLeft:"15%", marginRight:"15%",marginTop:"2%"}}>
  <div class="card-header">
    Meet title
  </div>
  <div class="card-body">

    <p class="card-text">With supporting text below as a description or admin/org names</p>
    <a href="/" class="btn btn-primary">Link option</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago/Date time
  </div>
</div>
<div class=" card text-left mb-2" style={{width: "", backgroundColor:"", marginLeft:"15%", marginRight:"15%"}}>
  <div class="card-header">
    Meet title
  </div>
  <div class="card-body">

    <p class="card-text">With supporting text below as a description or admin/org names</p>
    <a href="/" class="btn btn-primary">Link option</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago/Date time
  </div>
</div>
<div class=" card text-left mb-2" style={{width: "", backgroundColor:"", marginLeft:"15%", marginRight:"15%"}}>
  <div class="card-header">
    Meet title
  </div>
  <div class="card-body">

    <p class="card-text">With supporting text below as a description or admin/org names</p>
    <a href="/" class="btn btn-primary">Link option</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago/Date time
  </div>
</div>
</div>
      </div>
    )

}



export default PastMeets;
