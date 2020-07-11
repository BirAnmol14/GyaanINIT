import React from 'react';
import "./discuss.css"

function Videoshow(){ 
    return(
        <div style={{width:"60%",height:"60%",marginLeft:"30%",marginRight:"25%"}} class="card">
            <h2 align="center">Video Name</h2>
            <h3>Video Topic: </h3>
            <h3>Video Date: </h3>
        
            <div  class="embed-responsive embed-responsive-16by9">
            <iframe  class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default Videoshow;
