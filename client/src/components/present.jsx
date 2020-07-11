import React from 'react';
import "./discuss.css"

function Videoshow(){ 
    return(
        <div class="card">
            <h1 align="center">Vedio Name</h1>
            <h2>Video Topic: </h2>
            <h2>Video Date: </h2>
        
            <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default Videoshow;
