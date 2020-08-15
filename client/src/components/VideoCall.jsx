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
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import crousel from './crousel.jpg';
import './VideoCall.css';
import ServerRoutes from './ServerRoutes.js';

function VideoCall(props) {
 var [ toggle,changeToggle]=React.useState({width:"0px",height: "92%",top:"0px",right:"0px",position:"fixed", transition: "0.1s", overflowY: "scroll"});
 var [ toggle2,changeToggle2]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle3,changeToggle3]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle4,changeToggle4]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle5,changeToggle5]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 const [adminUser,setAdmin]=React.useState([]);
 const [userList,setList]=React.useState([]);
 const [darkMode,setDarkMode]=React.useState(false);
 const[mic,changeMicState] = React.useState(false);
 function toggle_micState(){
    mic?changeMicState(false):changeMicState(true) ;
 }
 const[video,changeVideoState] = React.useState(false);
 function toggle_videoState(){
   video?changeVideoState(false):changeVideoState(true);
 }
async function endCall(){
  var temp=window.location.href.split('/');
  const body=JSON.stringify({callUrl:temp[temp.length-1]});
  const response=await fetch(ServerRoutes.endCall,{
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body:body
  });
  const status=await response.status;
  if(status===200){
    const res=await response.json();
    if(res.status){
      window.location.href='/join';
    }else{
      alert(res.message);
      window.location.href='/join';
    }
  }else{
    alert('Error Leaving Call '+status);
  }
}
function toggleDarkMode() {
  setDarkMode(!darkMode);
}
async function changeToggle_(){
  var temp=window.location.href.split('/');
  var url=ServerRoutes.getVideoCallUsers+temp[temp.length-1];
const response=await fetch(url,{
  method:'GET',
  credentials: 'include'
});
const status=await response.status;
if(status===200){
  const res=await response.json();
  if(res.validUrl){
    setAdmin(res.users.filter(user=>user.email===res.admin_email));
    setList(res.users.filter(user=>user.email!==res.admin_email));
  }

}else{
  alert('Erorr in fetching userList '+status);
  setList([]);
}
toggle.width==="0px"?changeToggle((prevState) => ({
  ...prevState,
  width:"200px",

})):changeToggle((prevState) => ({
  ...prevState,
  width:"0px"
}))


}

function changeToggle2_(){

  toggle.width==="0px"?changeToggle2((prevState2) => ({
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
  }))

}

function changeToggle3_(){

  toggle.width==="0px"?changeToggle3((prevState3) => ({
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
  }))

}

function changeToggle4_(){

  toggle.width==="0px"?changeToggle4((prevState4) => ({
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
  }))

}

function changeToggle5_(){

  toggle.width==="0px"?changeToggle5((prevState5) => ({
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
  }))

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
      {
        adminUser.map((user,index)=>{return <li key={"admin "+index} id={"admin "+index} style={darkMode?{borderBottom:'2px solid white'}:{borderBottom:'2px solid black'}}className={darkMode?"list-group-item dark-mode":"list-group-item"}><p><img src={user.profilePic} alt="profile" style={{display:"inline",verticalAlign:"middle",float: "left"}}/><span>Admin:</span><br/><span>{user.name}</span><br/><span>@{user.uid}</span><br/><span>{user.email}</span></p></li>})
      }
      {
        userList.map((user,index)=>{return <li key={"user "+index} id={"user "+index} className={darkMode?"list-group-item dark-mode":"list-group-item"}><p><img src={user.profilePic} alt="profile" style={{display:"inline",verticalAlign:"middle",float: "left"}}/><span>{user.name}</span><br/><span>@{user.uid}</span><br/><span>{user.email}</span></p></li>})
      }
      </ul>
      </div>


      <nav className={darkMode?"navbar fixed-bottom navbar-dark bg-dark":"navbar fixed-bottom navbar-light bg-light"} id="bottomNav">
        <div className="d-flex justify-content-start">
          <button type="button" className={darkMode?"btn btn-secondary ml-2":"btn btn-light ml-2"}><AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon></button>
            <div class="btn-group dropup">
              <button type="button" className={darkMode?"btn btn-secondary dropdown-toggle ml-2":"btn btn-light dropdown-toggle ml-2"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <QueuePlayNextRoundedIcon></QueuePlayNextRoundedIcon></button>
              <div class={darkMode?"dropdown-menu dark-mode":"dropdown-menu"}>
                <button onClick={changeToggle2_} id = "presentation" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} type="button"><DescriptionRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></DescriptionRoundedIcon>Presentation</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle3_} id = "screenshare" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} type="button"><ScreenShareRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></ScreenShareRoundedIcon>Screenshare</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle4_} id = "videos" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} type="button"><LiveTvRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></LiveTvRoundedIcon>Videos</button>
                  <div class="dropdown-divider"></div>
                <button onClick={changeToggle5_} id = "whiteboard" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} type="button"><BorderColorRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></BorderColorRoundedIcon>Whiteboard</button>
                  <div className="dropdown-divider"></div>
                <button onClick={changeToggle2_} id = "draw" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} type="button"><GestureRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></GestureRoundedIcon>Draw</button>
              </div>

              {darkMode?  <button type='button' className={darkMode?"btn btn-secondary  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><WbSunnyRoundedIcon/></button>:<button type='button' className={darkMode?"btn btn-secondary  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><Brightness2RoundedIcon/> </button>}

            </div>

        </div>
        <div className="d-flex justify-content-center">
          {mic?<button type='button' className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_micState} ><KeyboardVoiceRoundedIcon></KeyboardVoiceRoundedIcon></button>
        :<button type="button" className="btn btn-danger ml-2" style = {{borderRadius: "30px"}} onClick={toggle_micState}><MicOffRoundedIcon></MicOffRoundedIcon> </button>
          }
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}} onClick={endCall}><PhoneDisabledIcon/></button>
          {video?<button type="button" className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamIcon></VideocamIcon></button>:
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamOffIcon></VideocamOffIcon></button>
          }
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={changeToggle_} className={darkMode?"btn btn-secondary  ml-2":"btn btn-light  ml-2"}><PeopleIcon></PeopleIcon></button>
          <button type="button" className={darkMode?"btn btn-secondary  ml-2":"btn btn-light  ml-2"} ><ChatIcon></ChatIcon></button>
        </div>

      </nav>
    </div>

  );
}

export default VideoCall;
