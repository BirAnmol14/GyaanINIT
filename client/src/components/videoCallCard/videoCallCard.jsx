import React from 'react';
function VideoCard(props){
  function getName(call){
    for(var i=0;i<props.peers.length;i++){
      if(props.peers[i].peerId===call.peer){
        return props.peers[i].userDetails.name;
      }
    }
    return "Unknown";
  }
  function getUserName(call){
    for(var i=0;i<props.peers.length;i++){
      if(props.peers[i].peerId===call.peer){
        return props.peers[i].userDetails.username;
      }
    }
    return "Unknown";
  }
  function getVideoId(call){
    for(var i=0;i<props.peers.length;i++){
      if(props.peers[i].peerId===call.peer){
        return "OtherVideo"+props.peers[i].socketId;
      }
    }
    return "Unknown";
  }
  function getDivId(call){
    for(var i=0;i<props.peers.length;i++){
      if(props.peers[i].peerId===call.peer){
        return "OtherVid"+props.peers[i].socketId;
      }
    }
    return "Unknown";
  }
  function runVideo(){
    if(props.stream){
      for(var i=0;i<props.stream.length;i++){
        var elem=document.getElementById(getVideoId(props.stream[i].call));
        if(elem){
          elem.srcObject=props.stream[i].obj;
        }
      }
    }
  }
  React.useEffect(()=>{
      runVideo();
  },[props.stream]);
  return(
  <div style={{position:'absolute',left:"10px",bottom:'50px',zIndex:50}}>
  <div className="card-deck" style={{margin:"0px"}}>
  {props.video?<div className="card bg-dark text-white">
  <video className="card-img" id="webcam" autoPlay playsInline style={{height:'100px',width:'100px'}}></video>
  <div className="card-img-overlay">
    <p className="card-text" style={{position:'absolute',bottom:'0px'}}>{props.name}</p>
  </div>
  </div>:null}
  {props.stream?props.stream.map((stream,i)=>{return <div key={"other"+i} id={getDivId(stream.call)} className="card bg-dark text-white">
    <video className="card-img" id={getVideoId(stream.call)} autoPlay playsInline style={{height:'100px',width:'100px'}}></video>
    <div className="card-img-overlay">
      <p className="card-text" style={{position:'absolute',bottom:'0px'}}>{getName(stream.call)}<br/>(@{getUserName(stream.call)})</p>
    </div>
    </div>}
  ):null}
  </div>
  </div>
  );
}
export default  VideoCard;
