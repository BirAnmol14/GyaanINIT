import React from 'react';
function VideoCard(props){
  function runVideo(){
    if(props.stream){
      for(var i=0;i<props.stream.length;i++){
        var elem=document.getElementById('video'+props.stream[i].id);
        if(elem){
          //elem.srcObject=props.stream[i].videoObj;
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
  {props.stream?props.stream.filter(stream=>stream.id!==props.username).map((stream,i)=>{return <div key={stream.id} id={stream.id} className="card bg-dark text-white">
    <video className="card-img" id={"video"+stream.id} autoPlay playsInline style={{height:'100px',width:'100px'}}></video>
    <div className="card-img-overlay">
      <p className="card-text" style={{position:'absolute',bottom:'0px'}}>{stream.name}</p>
    </div>
    </div>}
  ):null}
  </div>
  </div>
  );
}
export default  VideoCard;
