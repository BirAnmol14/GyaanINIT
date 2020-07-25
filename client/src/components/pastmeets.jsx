import React from 'react';
import Navbar from './navbar.jsx';

function PastMeets(){
    return(
      <div>
       
        <Navbar links={{active:{name:'Past Meets',url:'/pastmeets'},other:[{name:'Home',url:'/'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
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
