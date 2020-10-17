import React from 'react';
function VideoCard(props){
  return(
  <div style={{position:'absolute',left:"10px",bottom:'50px',zIndex:50}}>
  <div className="card-deck" style={{margin:"0px"}}>
  <div className="card bg-dark text-white">
  <video className="card-img" id="webcam" autoPlay playsInline style={{height:'100px',width:'100px'}}></video>
  <div className="card-img-overlay">
    <p className="card-text" style={{position:'absolute',bottom:'0px'}}>{props.name}</p>
  </div>
  </div>
  </div>
  </div>
  );
}
export default  VideoCard;
