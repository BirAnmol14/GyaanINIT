import React from 'react';
import Navbar from './navbar.jsx';

function PastMeets(props){

    return(
      <div>

        <Navbar links={{active:{name:'Past Meets',url:'/pastmeets'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true'  login={props.logged.status}/>
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
