import React from 'react';
import Navbar from './navbar.jsx';

function PastMeets(){
    return(
      <div>
        <Navbar logged='true' brand='true' join='true' create='true' discuss='true' search='true'/>
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
    )

}



export default PastMeets;
