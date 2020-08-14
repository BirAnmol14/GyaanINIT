import React from 'react';
import './VideoCall.css';
import KeyboardVoiceRoundedIcon from '@material-ui/icons/KeyboardVoiceRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import QueuePlayNextRoundedIcon from '@material-ui/icons/QueuePlayNextRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ScreenShareRoundedIcon from '@material-ui/icons/ScreenShareRounded';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import GestureRoundedIcon from '@material-ui/icons/GestureRounded';
import crousel from './crousel.jpg';

function VideoCall(props) {
 var [ toggle,changeToggle]=React.useState({width:"0px",height: "92%",top:"0px",right:"0px",position:"fixed", transition: "0.1s", overflowY: "scroll"});
 var [ toggle2,changeToggle2]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle3,changeToggle3]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle4,changeToggle4]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle5,changeToggle5]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 const[mic,changeMicState] = React.useState(false);
 function toggle_micState(){
    mic?changeMicState(false):changeMicState(true) ;
 }
 const[video,changeVideoState] = React.useState(false);
 function toggle_videoState(){
   video?changeVideoState(false):changeVideoState(true);
 }

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
} 
function changeToggle_(){

{toggle.width==="0px"?changeToggle((prevState) => ({
  ...prevState,
  width:"200px",

})):changeToggle((prevState) => ({
  ...prevState,
  width:"0px"
}))}

}

function changeToggle2_(){

  {toggle.width==="0px"?changeToggle2((prevState2) => ({
    ...prevState2,
    width: "98%",
    height: "80%",
    marginLeft: "10px",
    marginRight: "10px",
    overflow: "hidden",
    border: "1px solid black"
    
  })):changeToggle2((prevState2) => ({
    ...prevState2,
    width:"0%",
    hieght:"0%"
  }))}
  
}

function changeToggle3_(){

  {toggle.width==="0px"?changeToggle3((prevState3) => ({
    ...prevState3,
    width: "98%",
    height: "80%",
    marginLeft: "10px",
    marginRight: "10px",
    overflow: "hidden",
    border: "1px solid black"
    
  })):changeToggle3((prevState3) => ({
    ...prevState3,
    width:"0px"
  }))}
  
}

function changeToggle4_(){

  {toggle.width==="0px"?changeToggle4((prevState4) => ({
    ...prevState4,
    width: "98%",
    height: "80%",
    marginLeft: "10px",
    marginRight: "10px",
    overflow: "hidden",
    border: "1px solid black"
    
  })):changeToggle4((prevState4) => ({
    ...prevState4,
    width:"0px"
  }))}
  
}

function changeToggle5_(){

  {toggle.width==="0px"?changeToggle5((prevState5) => ({
    ...prevState5,
    width: "98%",
    height: "80%",
    marginLeft: "10px",
    marginRight: "10px",
    overflow: "hidden",
    border: "1px solid black"
    
  })):changeToggle5((prevState5) => ({
    ...prevState5,
    width:"0px",
    height:"0px"
  }))}
  
}


  return (
    <div className="full-height">
      {/* <h1>Video Call</h1>
    <h2>Url: {window.location.pathname.split('/')[2]}</h2> */}
      <div ><h1>Video Call</h1>
    <h2>Url: {window.location.pathname.split('/')[2]}</h2></div>

    
        <div style={toggle2}>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={crousel} alt="First slide"/>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={crousel}  alt="Second slide"/>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={crousel}  alt="Third slide"/>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div style={toggle3}>

        </div>

        <div style={toggle4}>

        </div>
        <div style={toggle5}>

        </div>

    
      <div style={toggle}>
      <ul className="list-group">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Morbi leo risus</li>
    <li className="list-group-item">Porta ac consectetur ac</li>
    <li className="list-group-item">Vestibulum at eros</li>
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Morbi leo risus</li>
    <li className="list-group-item">Porta ac consectetur ac</li>
    <li className="list-group-item">Vestibulum at eros</li>
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Morbi leo risus</li>
    <li className="list-group-item">Porta ac consectetur ac</li>
    <li className="list-group-item">Vestibulum at eros</li>
  </ul>
        </div>
       
        
      <nav class="navbar fixed-bottom navbar-light bg-light">

        <div class="d-flex justify-content-start">
          <button type="button" className="btn btn-light ml-2"><AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon></button>
            <div class="btn-group dropup">
              <button type="button" className="btn btn-light dropdown-toggle ml-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <QueuePlayNextRoundedIcon></QueuePlayNextRoundedIcon></button>
              <div class="dropdown-menu">
                <button onClick={changeToggle2_} id = "presentation" className="dropdown-item" type="button"><DescriptionRoundedIcon style = {{display: "inline"}}></DescriptionRoundedIcon>    presentation</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle3_} id = "screenshare" className="dropdown-item" type="button"><ScreenShareRoundedIcon style = {{display: "inline"}}></ScreenShareRoundedIcon>   screenshare</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle4_} id = "videos" class="dropdown-item" type="button"><LiveTvRoundedIcon style = {{display: "inline"}}></LiveTvRoundedIcon>   videos</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle5_} id = "whiteboard" class="dropdown-item" type="button"><BorderColorRoundedIcon style = {{display: "inline"}}></BorderColorRoundedIcon>   whiteboard</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle2_} id = "draw" class="dropdown-item" type="button"><GestureRoundedIcon style = {{display: "inline"}}></GestureRoundedIcon>   draw</button>
              </div>
              <button onclick={myFunction()}>Toggle dark mode</button>
            </div>

        </div>
        <div class="d-flex justify-content-center">
          {mic?<button type='button' className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_micState} ><KeyboardVoiceRoundedIcon></KeyboardVoiceRoundedIcon></button>
        :<button type="button" className="btn btn-danger ml-2" style = {{borderRadius: "30px"}} onClick={toggle_micState}><MicOffRoundedIcon></MicOffRoundedIcon> </button>
          }
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}}><PhoneDisabledIcon></PhoneDisabledIcon></button>
          {video?<button type="button" className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamIcon></VideocamIcon></button>:
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamOffIcon></VideocamOffIcon></button>
          }
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={changeToggle_} class="btn btn-secondary ml-1"><PeopleIcon></PeopleIcon></button>
          <button type="button" class="btn btn-secondary btn-sm ml-1" ><ChatIcon></ChatIcon></button>
        </div>

      </nav>
    </div>

  );
}

export default VideoCall;
