import React from 'react';
import './VideoCall.css';



import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardVoiceRoundedIcon from '@material-ui/icons/KeyboardVoiceRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import QueuePlayNextRoundedIcon from '@material-ui/icons/QueuePlayNextRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ScreenShareRoundedIcon from '@material-ui/icons/ScreenShareRounded';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import GestureRoundedIcon from '@material-ui/icons/GestureRounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import crousel from './crousel.jpg';
import desktop from './desktop.jpg';
import './VideoCall.css';
import ServerRoutes from './ServerRoutes.js';



function initDraw(canvas) {
  var mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
  };
  function setMousePosition(e) {
      var ev = e || window.event; //Moz || IE
      if (ev.pageX) { //Moz
          mouse.x = ev.pageX + window.pageXOffset;
          mouse.y = ev.pageY + window.pageYOffset;
      } else if (ev.clientX) { //IE
          mouse.x = ev.clientX + document.body.scrollLeft;
          mouse.y = ev.clientY + document.body.scrollTop;
      }
  };

  var element = null;
  canvas.onmousemove = function (e) {
      setMousePosition(e);
      if (element !== null) {
          element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
          element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
          element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
          element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
      }
  }

  canvas.onclick = function (e) {
      if (element !== null) {
          element = null;
          canvas.style.cursor = "default";

      } else {

          mouse.startX = mouse.x;
          mouse.startY = mouse.y;
          element = document.createElement('div');
          element.className = 'rectangle'
          element.style.left = mouse.x + 'px';
          element.style.top = mouse.y + 'px';
          canvas.appendChild(element)
          canvas.style.cursor = "crosshair";
      }
  }
}

function VideoCall(props) {

 var [ toggle,changeToggle]=React.useState({width:"0px",height: "90%",top:"0px",right:"0px",position:"fixed", transition: "0.1s", overflowY: "scroll"});
 var [ toggle2,changeToggle2]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle3,changeToggle3]=React.useState({width: "78%",height: "80%",marginLeft: "10px",marginRight: "10px",
 overflow: "hidden",border: "1px solid black",transition: "0.1s", float:"left"});
 var [ toggle4,changeToggle4]=React.useState({width:"18%",height: "80%",marginLeft: "10px",marginRight: "10px",
 overflow: "hidden",border: "1px solid black",transition: "0.1s", float:"right"});
 var [ toggle5,changeToggle5]=React.useState({width:"0%",height: "0%",position:"fixed", transition: "0.1s"});
 var [ toggle6,changeToggle6]=React.useState({width:"0px",height: "92%",top:"0px",right:"0px",position:"fixed", transition: "0.1s"});
 var [param,changeParam] = React.useState(0);
 const [inCall,setInCall]=React.useState(false);
 const [adminUser,setAdmin]=React.useState([]);
 const [adminBool,checkAdmin]=React.useState();
 const [adminBoolHelper,checkAdminHelper]=React.useState(false);
 const [userList,setList]=React.useState([]);
 const [darkMode,setDarkMode]=React.useState(false);
 const[mic,changeMicState] = React.useState(false);
 const [recording,setRecording]=React.useState(false);
 const [recTime,setRecTime]=React.useState({hrs:0,min:0,sec:0});
 const [timerId,setTimerId]=React.useState(null);
 const [userListTimerId,setUserListTimerId]=React.useState(null);
 const [chatTimerId,setChatTimerId]=React.useState(null);
 const [chatText,setChatText]=React.useState("");
 const [chats,setChats]=React.useState([]);
 const [getChats,setGetChats]=React.useState(false);
 const [newMessage,setNewMessage]=React.useState(false);
 const [getUsers,setGetUsers]=React.useState(false);
 const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const divsadded = () =>
{

    switch(param){
    case 1:
      return (
    <div style={toggle3}>
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
    </div>);

    case 2:
      return (
    <div style={toggle3}>
         <img class="d-block w-100" src={desktop} alt="screen share slide"/>
    </div>);

    case 3:
      return (
    <div style={toggle3}>
        <iframe width="100%" height="100%"
        src="https://www.youtube.com/embed/tgbNymZ7vqY" title="ytVideo">
        </iframe>
    </div>);

    case 4:
      return (
    <div style={toggle3}>

    </div>
    );

    default:
        return (
          <div style={toggle3}>

          </div>);
    }
  }


 function toggle_micState(){

    mic?changeMicState(false):changeMicState(true) ;
 }
 const[video,changeVideoState] = React.useState(false);
 function toggle_videoState(){
   video?changeVideoState(false):changeVideoState(true);
 }
 function toggleRecording(){
   setRecording(prev=>!prev);
 }
 React.useEffect(()=>{
   if(recording){
     setRecTime({hrs:0,min:0,sec:0});
     var startTime=new Date().getTime();
     let timer_id=setInterval(()=>{
         var currTime=new Date().getTime();
         var diff=(currTime-startTime)/1000;
         var hr=Math.floor(diff/3600);
         diff=diff%3600;
         var min=Math.floor((diff)/60);
         diff=diff%60;
         var sec=Math.floor(diff);
         setRecTime({hrs:hr,min:min,sec:sec});
     },1000);
     setTimerId(timer_id);
   }else{
     clearInterval(timerId);
     setRecTime({hrs:0,min:0,sec:0});
   }
 },[recording]);

function prettyPrintTime(){
  var string="";
  string+=recTime.hrs<10?"0"+recTime.hrs+":":recTime.hrs+":";
  string+=recTime.min<10?"0"+recTime.min+":":recTime.min+":";
  string+=recTime.sec<10?"0"+recTime.sec:recTime.sec;
  return string;
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

if(toggle.width==="0px"){
  fetchUserList();
  changeToggle6((prev)=>({...prev,width:"0px"}));
  setGetChats(false);
  setGetUsers(true);
}else{
  setGetUsers(false);
}
toggle.width==="0px"?changeToggle((prevState) => ({
  ...prevState,
  width:"120px",

})):changeToggle((prevState) => ({
  ...prevState,
  width:"0px"
}))
}
async function fetchUserList(){
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
}
React.useEffect(()=>{
  if(getUsers){
    var timerId=setInterval(()=>{
      fetchUserList();
    },2*1000);
    setUserListTimerId(timerId);
  }else{
    clearInterval(userListTimerId);
  }
},[getUsers]);

async function changeToggle6_(){
  if(toggle6.width==="0px"){
    await fetchCallChat();
    changeToggle((prev)=>({...prev,width:"0px"}));
    setGetUsers(false);
    setGetChats(true);
    var chatsDiv=document.getElementById('chatsDiv');
    chatsDiv.scrollTop=chatsDiv.scrollHeight;
  }else{
    setGetChats(false);
  }
  toggle6.width==="0px"?changeToggle6((prevState) => ({
    ...prevState,
    width:"250px",

  })):changeToggle6((prevState) => ({
    ...prevState,
    width:"0px"
  }));
}
async function fetchCallChat(){
  var temp=window.location.href.split('/');
  var url=ServerRoutes.getCallChat+temp[temp.length-1];
  const response=await fetch(url,{
    method:'GET',
    credentials: 'include'
  });
  const status=await response.status;
  if(status===200){
    const res=await response.json();
    if(res.status===true){
      setChats((prev)=>{if(prev.length!==res.chats.length){setNewMessage(true)}else{setNewMessage(false)};return(res.chats)});
    }else{
      alert(res.message);
      window.location.href='/';
    }
  }else{
    alert('Error '+status);
  }
}
React.useEffect(()=>{
  if(getChats){
    if(newMessage){
      var chatsDiv=document.getElementById('chatsDiv');
      chatsDiv.scrollTop=chatsDiv.scrollHeight;
    }
    var timerId=setInterval(()=>{
      fetchCallChat();
    },0.5*1000);
    setChatTimerId(timerId);
  }else{
    clearInterval(chatTimerId);
  }
},[getChats,newMessage]);

function changeToggle2_(){

  toggle2.width==="0px"?changeToggle2((prevState) => ({
    ...prevState,
    width: "98%",
    height: "80%",
    marginLeft: "10px",
    marginRight: "10px",
    overflow: "hidden",
    border: "1px solid black"

  })):changeToggle2((prevState) => ({
    ...prevState,
    width:"0%",
    hieght:"0%"
  }))

}

async function postChatMessage(){
  if(chatText.length===0){
    return;
  }
  const temp=window.location.href.split('/');
  const body=JSON.stringify({callUrl:temp[temp.length-1],message:chatText});
  const response= await fetch(ServerRoutes.postChatMessage,{
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body
  });
  const status=await response.status;
  if(status===200){
    const res=await response.json();
    if(res.status===true){
      await fetchCallChat();
      var chatsDiv=document.getElementById('chatsDiv');
      chatsDiv.scrollTop=chatsDiv.scrollHeight;
    }else{
      alert(res.message);
      window.location.href='/';
    }
  }else{
    alert('Error '+status);
  }
  setChatText("");
}

async function verifyCall(){
  const temp=window.location.href.split('/');
  const body=JSON.stringify({callUrl:temp[temp.length-1]});
  const response = await fetch(ServerRoutes.verifyUserInCall,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body
  });
  const status=await response.status;
  if(status===200){
    const res=await response.json();
    if(res.status){
      setInCall(true);
    }else{
      setInCall(false);
      alert(res.message);
      window.location.href='/join';
    }
  }else{
    alert('Error verifying'+status);
    window.location.href='/join';
  }
}
async function check_Admin(){
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
    checkAdmin(res.users.filter(user=>user.email===res.admin_email));
    }
}
else{
  alert('Erorr in fetching Admin '+status);
}

}
function admin_helper(){
  if(props.logged.status && adminBool){


    if(props.logged.user.email===adminBool[0].email){

      return true;
    }

    return false;
  }
}
React.useEffect(()=>{
  check_Admin();
  verifyCall();

},[]);
React.useEffect(()=>{
 checkAdminHelper(admin_helper);
})

return (

    inCall===false?<div/>:
    <div className="full-height">
  <div style={{right:"0",top:"0",position:"fixed"}}><div class="card" style={{padding:"2px",margin:"1px"}}><SignalCellular4BarIcon/>{}</div></div>
        <div style={{width:"100%" ,height:"90%" , overflow:"hidden"}}>
        {
          divsadded()
        }
        <div style={toggle4}>

        </div>
        </div>

      {getUsers?<div style={toggle}>
      <ul className="list-group">
      {
        adminUser.map((user,index)=>{return <li key={"admin "+index} id={"admin "+index}  style={darkMode?{borderBottom:'2px solid white',padding:'0px'}:{borderBottom:'2px solid black',padding:'0px'}}className={darkMode?"list-group-item dark-mode":"list-group-item"}><HtmlTooltip
        title={
          <React.Fragment>
          <span>Admin</span><br/><span>{user.name}</span><br/><span>@{user.uid}</span><br/>email:{user.email}<span></span>
          </React.Fragment>
        }
      >
        <div style={{padding:"4px"}}><center><img src={user.profilePic} alt="profile" style={{height:'4rem',width:'4rem',marginLeft:'0px',marginRight:'0px',display:"inline",verticalAlign:"middle"}}/></center></div>
      </HtmlTooltip></li>})
      }
      {
        userList.map((user,index)=>{return <li key={"user "+index} id={"user "+index} style={{padding:'0px'}} className={darkMode?"list-group-item dark-mode":"list-group-item"}><HtmlTooltip
        title={
          <React.Fragment>
           <span>{user.name}</span><br/><span>@{user.uid}</span><br/>email:{user.email}<span></span>
          </React.Fragment>
        }
      >
          <div style={{padding:"4px"}}><center><img src={user.profilePic} alt="profile" style={{height:'4rem',width:'4rem',marginLeft:'0px',marginRight:'0px',display:"inline",verticalAlign:"middle"}}/></center></div>
      </HtmlTooltip></li>})
      }
      </ul>
      </div>:null}

{getChats?<div style={darkMode?{...toggle6,backgroundColor:"#343A40"}:{...toggle6,backgroundColor:"white"}}>
      <div style={darkMode?{backgroundColor:" #343A40;", height:"100%"}:{backgroundColor:"white", height:"100%"}}>
      <div className="list-group chat-list" id="chatsDiv" style={darkMode?{backgroundColor:" #343A40;"}:{backgroundColor:"white"}}>
      {
        chats.map((chat,index)=>{return <div id={index} className={darkMode?"list-group-item dark-mode list-group-item-action flex-column align-items-start":"list-group-item list-group-item-action flex-column align-items-start"}>
            <div className="d-flex">
              <img src={chat.user.profilePic} alt="profile" style={{height:'1.5rem',width:'1.5rem',marginLeft:'0px',marginRight:'5px',display:"inline",verticalAlign:"middle"}}/>
              <small style={{display:"inline",verticalAlign:"middle"}}>{chat.user.name}</small>
            </div>
            <p className="">{chat.message}</p>
            <small>{chat.time.toLocaleString()}</small>
          </div>
          }
        )
      }
      </div>
<div style={{bottom:"5%",marginBottom:"1.5%" ,backgroundColor:"",position:"fixed",zIndex:"2",height:"15%"}} className={darkMode?"dark-mode":null}>
    <textarea className="textarea_custom" placeholder="Type message.." name="msg" required style={{width:"90%"}} value={chatText} onChange={(eve)=>{const {value}=eve.target; setChatText(value)}}></textarea>
    <button type="button" className={"btn btn-primary  ml-2"} onClick={postChatMessage}><SendIcon style = {{display: "inline",verticalAlign:"middle"}}/></button>
</div>
      </div>
      </div>
:null}
      <nav className={darkMode?"navbar fixed-bottom navbar-dark bg-dark":"navbar fixed-bottom navbar-light bg-light"} id="bottomNav">
      {adminBoolHelper===true?<div className="d-flex justify-content-start">
{darkMode?  <button type='button' className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><WbSunnyRoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}/></button>:<button type='button' className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><Brightness2RoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}/> </button>}
  <button type="button" className={darkMode?"btn btn-dark ml-2":"btn btn-light ml-2"}><AddCircleOutlineRoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}></AddCircleOutlineRoundedIcon></button>
    <div class="btn-group dropup">
      <button type="button" className={darkMode?"btn btn-dark dropdown-toggle ml-2":"btn btn-light dropdown-toggle ml-2"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <QueuePlayNextRoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}></QueuePlayNextRoundedIcon></button>
      <div class={darkMode?"dropdown-menu dark-mode":"dropdown-menu"}>
        <button type = "button" onClick={()=>changeParam(1)} id = "presentation" className={darkMode?"dropdown-item dark-mode":"dropdown-item"}><DescriptionRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></DescriptionRoundedIcon>Presentation</button>
          <div class="dropdown-divider"></div>
        <button type = "button" onClick={()=>changeParam(2)} id = "screenshare" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} ><ScreenShareRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></ScreenShareRoundedIcon>Screenshare</button>
          <div class="dropdown-divider"></div>
        <button type = "button" onClick={()=>changeParam(3)} id = "videos" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} ><LiveTvRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></LiveTvRoundedIcon>Videos</button>
          <div class="dropdown-divider"></div>
        <button type = "button" onClick={()=>changeParam(4)} id = "whiteboard" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} ><BorderColorRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></BorderColorRoundedIcon>Whiteboard</button>
          <div className="dropdown-divider"></div>
        <button type = "button"  onClick={()=>changeParam(5)} id = "draw" className={darkMode?"dropdown-item dark-mode":"dropdown-item"} ><GestureRoundedIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'5px'}}></GestureRoundedIcon>Draw</button>
      </div>
    </div>
    {recording?<button type="button" className={darkMode?"btn btn-dark ml-2":"btn btn-light ml-2"} onClick={toggleRecording}><RemoveCircleOutlineIcon style = {{display: "inline",verticalAlign:"middle",marginRight:'10px'}}/>{prettyPrintTime()}</button>:<button type="button" className={darkMode?"btn btn-dark ml-2":"btn btn-light ml-2"} onClick={toggleRecording}><RadioButtonCheckedIcon style = {{display: "inline",verticalAlign:"middle"}}/></button>}

</div>:<div className="d-flex justify-content-start">
{darkMode?  <button type='button' className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><WbSunnyRoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}/></button>:<button type='button' className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"} onClick={toggleDarkMode}><Brightness2RoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}/> </button>}</div>}
        <center>
        <div className="d-flex justify-content-center">
          {mic?<button type='button' className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_micState} ><KeyboardVoiceRoundedIcon style = {{display: "inline",verticalAlign:"middle"}}></KeyboardVoiceRoundedIcon></button>
        :<button type="button" className="btn btn-danger ml-2" style = {{borderRadius: "30px"}} onClick={toggle_micState}><MicOffRoundedIcon  style = {{display: "inline",verticalAlign:"middle"}}></MicOffRoundedIcon> </button>
          }
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}} onClick={endCall}><PhoneDisabledIcon  style = {{display: "inline",verticalAlign:"middle"}}/></button>
          {video?<button type="button" className="btn btn-primary ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamIcon  style = {{display: "inline",verticalAlign:"middle"}}></VideocamIcon></button>:
          <button type="button" className="btn btn-danger ml-2" style = {{borderRadius : "50px"}} onClick = {toggle_videoState}><VideocamOffIcon  style = {{display: "inline",verticalAlign:"middle"}}></VideocamOffIcon></button>
          }
        </div>
        </center>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={changeToggle_} className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"}><PeopleIcon  style = {{display: "inline",verticalAlign:"middle"}}></PeopleIcon></button>

          <button type="button" onClick={changeToggle6_} className={darkMode?"btn btn-dark  ml-2":"btn btn-light  ml-2"} ><ChatIcon  style = {{display: "inline",verticalAlign:"middle"}}></ChatIcon></button>

          <div class="btn-group dropup">
            <button type="button" className={darkMode?"btn btn-dark dropdown-toggle ml-2":"btn btn-light dropdown-toggle ml-2"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <InfoIcon style = {{display: "inline",verticalAlign:"middle"}}></InfoIcon></button>
            <div class={darkMode?"dropdown-menu dropdown-menu-right dark-mode":"dropdown-menu dropdown-menu-right"}>
            <div ><h3>Meet Details</h3></div>
            <div class="dropdown-divider"></div>
            <div>
            <h4>Url: {window.location.href}</h4>
            </div>
            <div class="dropdown-divider"></div>
            <div>
            <h4>Description: </h4>
            </div>
            </div>
          </div>
        </div>

      </nav>
    </div>

  );
}

export default VideoCall;
