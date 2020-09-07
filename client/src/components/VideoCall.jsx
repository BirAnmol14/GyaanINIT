import React from 'react';
import './VideoCall.css';
import Toast from './toast/Toast.jsx';
import audioSrc from './audio/sms-alert.mp3';

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
import Badge from '@material-ui/core/Badge';
import socketIOClient from "socket.io-client";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarRateIcon from '@material-ui/icons/StarRate';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';
import NetworkCellIcon from '@material-ui/icons/NetworkCell';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Canvas from "./Canvas.jsx"

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
  const [appSocket, setAppSocket] = React.useState(null);
  var [toggle, changeToggle] = React.useState({ width: "0%", height: "90%", top: "0px", right: "0px", position: "fixed", transition: "0.1s" });//,overflowY:"scroll"});
  var [toggle2, changeToggle2] = React.useState({ width: "0%", height: "0%", position: "fixed", transition: "0.1s" });
  var [toggle3, changeToggle3] = React.useState({
    width: "78%", backgroundColor: "white", height: "80%", marginLeft: "10px", marginRight: "10px",
    overflow: "hidden", border: "1px solid black", transition: "0.1s", float: "left"
  });
  var [toggle4, changeToggle4] = React.useState({
    width: "18%", height: "80%", marginLeft: "10px", marginRight: "10px",
    overflow: "hidden", border: "1px solid black", transition: "0.1s"
  });
  var [toggle5, changeToggle5] = React.useState({ width: "0%", height: "0%", position: "fixed", transition: "0.1s" });
  var [toggle6, changeToggle6] = React.useState({ width: "0px", height: "92%", top: "0px", right: "0px", position: "fixed", transition: "0.1s",zIndex:"3" });
  var [param, changeParam] = React.useState(0);
  var [paramBool, changeParamBool] = React.useState(false);
  var [toggle9, changeToggle9] = React.useState({
    width: "100%", height: "25%", marginLeft: "", marginRight: "",
    overflow: "hidden", border: "1px solid black", transition: "0.1s"
  });
  var [divHeight, setDivHeight] = React.useState("0%");
  var [divDisplay, setDivDisplay] = React.useState("none");
  var [divWidth, setDivWidth] = React.useState("122%");
  const [inCall, setInCall] = React.useState(false);
  const [adminUser, setAdmin] = React.useState([]);
  const [adminBool, checkAdmin] = React.useState();
  const [adminBoolHelper, checkAdminHelper] = React.useState(false);
  const [userList, setList] = React.useState([]);
  const [darkMode, setDarkMode] = React.useState(false);
  const [mic, changeMicState] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [recTime, setRecTime] = React.useState({ hrs: 0, min: 0, sec: 0 });
  const [timerId, setTimerId] = React.useState(null);
  const [chatText, setChatText] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState(false);
  const [openWindows, setOpenWindows] = React.useState([]);
  const [toastMsg, setToastMsg] = React.useState(" ");
  const [pvtChatDisplay,setPvtChatDisplay]=React.useState("None");
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const divsadded = () => {
    console.log(openWindows);

    switch (param) {
      case 1:

        return (
          <div style={toggle3}>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src={crousel} alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={crousel} alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={crousel} alt="Third slide" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>);




      case 2:
        return (
          <div style={toggle3}>
            <img className="d-block w-100" src={desktop} alt="screen share slide" />
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
            4th white board
          </div>
        );
      case 5:
        return (
          <div style={toggle3}>
            <Canvas />
          </div>
        );

      default:
        return (
          <div style={toggle3}>

          </div>);
    }

  }




  function toggle_micState() {

    mic ? changeMicState(false) : changeMicState(true);
  }
  const [video, changeVideoState] = React.useState(false);
  function toggle_videoState() {
    video ? changeVideoState(false) : changeVideoState(true);
  }
  function toggleRecording() {
    setRecording(prev => !prev);
  }
  React.useEffect(() => {
    if (recording) {
      setRecTime({ hrs: 0, min: 0, sec: 0 });
      var startTime = new Date().getTime();
      let timer_id = setInterval(() => {
        var currTime = new Date().getTime();
        var diff = (currTime - startTime) / 1000;
        var hr = Math.floor(diff / 3600);
        diff = diff % 3600;
        var min = Math.floor((diff) / 60);
        diff = diff % 60;
        var sec = Math.floor(diff);
        setRecTime({ hrs: hr, min: min, sec: sec });
      }, 1000);
      setTimerId(timer_id);
    } else {
      clearInterval(timerId);
      setRecTime({ hrs: 0, min: 0, sec: 0 });
    }
  }, [recording]);

  function prettyPrintTime() {
    var string = "";
    string += recTime.hrs < 10 ? "0" + recTime.hrs + ":" : recTime.hrs + ":";
    string += recTime.min < 10 ? "0" + recTime.min + ":" : recTime.min + ":";
    string += recTime.sec < 10 ? "0" + recTime.sec : recTime.sec;
    return string;
  }

  async function endCall() {
    var temp = window.location.href.split('/');
    const body = JSON.stringify({ callUrl: temp[temp.length - 1] });
    const response = await fetch(ServerRoutes.endCall, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    });
    const status = await response.status;
    if (status === 200) {
      const res = await response.json();
      if (res.status) {
        window.location.href = '/join';
      } else {
        alert(res.message);
        window.location.href = '/join';
      }
    } else {
      alert('Error Leaving Call ' + status);
    }
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function changeToggle_() {
    if (toggle.width === '0px') {
      changeToggle6((prevState) => ({
        ...prevState,
        width: "0px"
      }));
    }
    toggle.width === "0px" ? changeToggle((prevState) => ({
      ...prevState,
      width: "auto",

    })) : changeToggle((prevState) => ({
      ...prevState,
      width: "0px"
    }))
  }

  function SetUserList(res) {
    if (res.validUrl) {
      setAdmin(res.users.filter(user => user.username === res.admin_username));
      setList(res.users.filter(user => user.username !== res.admin_username));
    }
  }

  function changeToggle6_() {
    if (toggle6.width === '0px') {
      changeToggle((prevState) => ({
        ...prevState,
        width: "0px"
      }));
    }
    toggle6.width === "0px" ? changeToggle6((prevState) => ({
      ...prevState,
      width: "250px",

    })) : changeToggle6((prevState) => ({
      ...prevState,
      width: "0px"
    }));
  }

  React.useEffect(() => {
    if (toggle6.width !== '0px') {
      setNewMessage(false);
      var chatsDiv = document.getElementById('chatsDiv');
      chatsDiv.scrollTop = chatsDiv.scrollHeight;
    }
  }, [toggle6.width]);


  function setCallChat(res) {
    if (res.status === true) {
      if (res.chats.length !== chats.length) {
        setChats(res.chats);
      }
    } else {
      alert(res.message);
      window.location.href = '/';
    }
  }
  React.useEffect(() => {
    if (toggle6.width !== '0px') {
      setNewMessage(false);
      var chatsDiv = document.getElementById('chatsDiv');
      chatsDiv.scrollTop = chatsDiv.scrollHeight;
    }
    else if (chats.length !== 0) { setNewMessage(true); var y = document.getElementById("noti_audio"); if (y) { y.play(); } }
  }, [chats]);


  function changeToggle2_() {

    toggle2.width === "0px" ? changeToggle2((prevState) => ({
      ...prevState,
      width: "98%",
      height: "80%",
      marginLeft: "10px",
      marginRight: "10px",
      overflow: "hidden",
      border: "1px solid black"

    })) : changeToggle2((prevState) => ({
      ...prevState,
      width: "0%",
      hieght: "0%"
    }))

  }

  async function postChatMessage() {
    if (chatText.length === 0) {
      return;
    }
    const temp = window.location.href.split('/');
    const body = JSON.stringify({ callUrl: temp[temp.length - 1], message: chatText });
    const response = await fetch(ServerRoutes.postChatMessage, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    });
    const status = await response.status;
    if (status === 200) {
      const res = await response.json();
      if (res.status === true) {
        let socket = appSocket;
        if (socket) {
          socket.emit('messagePosted');
        }
      } else {
        alert(res.message);
        window.location.href = '/';
      }
    } else {
      alert('Error ' + status);
    }
    setChatText("");
  }

  async function verifyCall() {
    const temp = window.location.href.split('/');
    const body = JSON.stringify({ callUrl: temp[temp.length - 1] });
    const response = await fetch(ServerRoutes.verifyUserInCall, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    });
    const status = await response.status;
    if (status === 200) {
      const res = await response.json();
      if (res.status) {
        setInCall(true);
      } else {
        setInCall(false);
        alert(res.message);
        window.location.href = '/join';
      }
    } else {
      alert('Error verifying' + status);
      window.location.href = '/join';
    }
  }
  async function check_Admin() {
    var temp = window.location.href.split('/');
    var url = ServerRoutes.getVideoCallUsers + temp[temp.length - 1];
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    });
    const status = await response.status;
    if (status === 200) {
      const res = await response.json();
      if (res.validUrl) {
        checkAdmin(res.admin_username);
      }
    }
    else {
      alert('Erorr in fetching Admin ' + status);
    }

  }
  function admin_helper() {
    if (props.logged.status && adminBool) {
      if (props.logged.user.username === adminBool) {
        return true;
      }
      return false;
    }
  }

  React.useEffect(() => {
    async function startUp() {
      await verifyCall();
    }
    setTimeout(()=>{
        startUp();
    },1000) ;
  }, []);
  React.useEffect(() => {
   async function runner() {
        await check_Admin();
    }
      runner();
  }, [props.logged]);
React.useEffect(() => {
   checkAdminHelper(admin_helper());
}, [adminBool]);

  React.useEffect(()=>{
    if (props.logged.status === true) {
      const socket = socketIOClient(ServerRoutes.socketEndpoint);
      setAppSocket(socket);
      var callUrl = window.location.href.split('/');
      socket.emit('join', { user: props.logged.user.username, callUrl: callUrl[callUrl.length - 1] });
      socket.on('join', (data) => {
        setToastMsg(data.message);
        //Listen to all other joining messages
      })
      socket.on('left', (data) => {
        //Listen to all other leaving messages
         setToastMsg(data.message);
      });
      socket.on('userList', (data) => {
         SetUserList(data);
      });
      socket.on('chatList', (data) => {
         setCallChat(data);
      });
    }
  },[adminBoolHelper]);

  React.useEffect(() => {
    if (toastMsg.length !== 0) {
      display();
    }
  }, [toastMsg]);
  function display() {
    var x = document.getElementById("snackbar");
    if (x) {
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); setToastMsg(""); }, 3000);
    }
  }

  async function changeParamBool() {
    changeParamBool(false);
  }
  function funcSetDiv() {
    setDivWidth("100%");
    setDivDisplay("block");
  }


  return (

    inCall === false ? <div /> :
      <div className="full-height">
        <div style={{display:pvtChatDisplay,position:"fixed",right:"70px",bottom:"50px"}}>
                  <p>

 <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
   Name of guy
 </button>
</p>
<div className="collapse" id="collapseExample" >

 <div style={{border:"2px", zIndex:"1",backgroundColor:"wheat", width:"250px",height:"25%"}}>
          <div style={{maxHeight:"200px",overflowY:"scroll"}} className={darkMode ? "list-group chat-list dark-mode" : "list-group chat-list"} id="chatsDiv2">
              {

                chats.map((chat, index) => {
                  return <div id={index} key={index} style={darkMode ? { borderBottom: '1px solid white', padding: '1em' } : { borderBottom: '1px solid black', padding: '1emm' }} className={darkMode ? "list-group-item dark-mode list-group-item-action flex-column align-items-start" : "list-group-item list-group-item-action flex-column align-items-start"} >
                    <div className="d-flex">
                      <img src={chat.user.profilePic} alt="profile" style={{ height: '1.5rem', width: '1.5rem', marginLeft: '0px', marginRight: '5px', display: "inline", verticalAlign: "middle" }} />
                      <small style={{ display: "inline", verticalAlign: "middle" }}>{chat.user.name}</small>
                    </div>
                    <p className="">{chat.message}</p>
                    <small>{new Date(chat.time).toLocaleString()}</small>
                  </div>
                }
                )

              }
            </div>



   <div style={{ bottom: "20%", marginBottom: "1.5%", backgroundColor: "", position: "relative", zIndex: "2", height: "5%" }} className={darkMode ? "dark-mode" : null}>
              <p style={{height:"50px"}}><textarea className="textarea_custom" placeholder="Type message.." name="msg" required style={{ width: "70%" }} value={chatText} onChange={(eve) => { const { value } = eve.target; setChatText(value) }}></textarea>
                <button type="button" className={"btn btn-primary  ml-1"} onClick={postChatMessage} style={{ marginBottom: "20%" }} ><SendIcon style={{ display: "inline", verticalAlign: "middle" }} /></button>
              </p>
            </div>
 </div>
</div>
</div>

        <Toast message={toastMsg} />
        <audio src={audioSrc} style={{ display: "none" }} id="noti_audio" />
        <div style={{ right: "0", top: "0", position: "fixed" }}><div className="card" style={{ padding: "2px", margin: "1px" }}><SignalCellular4BarIcon />{}</div></div>
        <div style={{ width: divWidth, marginTop: "50px", marginBottom: "20px", height: "100%", overflow: "hidden" }}>
          {
            paramBool ? divsadded() : <div style={toggle3}></div>
          }


          <div style={{
            width: "18%", height: "80%", marginLeft: "10px", marginRight: "10px",
            overflow: "hidden", border: "1px solid black", transition: "0.1s", display: divDisplay
          }}>
            {openWindows.indexOf(1) !== -1 && param !== 1 ?
              <div style={{
                width: "100%", height: divHeight, marginLeft: "", marginRight: "",
                overflow: "hidden", border: "1px solid black", transition: "0.1s"
              }} onClick={() => { changeParam(1); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 1); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? setDivDisplay("block") : setDivDisplay("none") } return [...arr, 1] }); changeParamBool(true); }}  >  <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={crousel} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={crousel} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={crousel} alt="Third slide" />
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div> : null}
            {openWindows.indexOf(2) !== -1 && param !== 2 ?
              <div style={{
                width: "100%", height: divHeight, marginLeft: "", marginRight: "",
                overflow: "hidden", border: "1px solid black", transition: "0.1s"
              }} onClick={() => { changeParam(2); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 2); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? setDivDisplay("block") : setDivDisplay("none") } return [...arr, 2] }); changeParamBool(true); }}  > <img className="d-block w-100" src={desktop} alt="screen share slide" />
              </div> : null}
            {openWindows.indexOf(3) !== -1 && param !== 3 ?
              <div style={{
                width: "100%", height: divHeight, marginLeft: "", marginRight: "",
                overflow: "hidden", border: "1px solid black", transition: "0.1s"
              }} onClick={() => { changeParam(3); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 3); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? setDivDisplay("block") : setDivDisplay("none") } return [...arr, 3] }); changeParamBool(true); }}  > <iframe width="100%" height="100%"
                src="https://www.youtube.com/embed/tgbNymZ7vqY" title="ytVideo">
                </iframe>
              </div> : null}
            {openWindows.indexOf(4) !== -1 && param !== 4 ?
              <div style={{
                width: "100%", height: divHeight, marginLeft: "", marginRight: "",
                overflow: "hidden", border: "1px solid black", transition: "0.1s"
              }} onClick={() => { changeParam(4); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 4); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? setDivDisplay("block") : setDivDisplay("none") } return [...arr, 4] }); changeParamBool(true); }}  >4th{divHeight}

              </div> : null}
            {openWindows.indexOf(5) !== -1 && param !== 5 ?
              <div style={{
                width: "100%", height: divHeight, marginLeft: "", marginRight: "",
                overflow: "hidden", border: "1px solid black", transition: "0.1s"
              }} onClick={() => { changeParam(5); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 5); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? setDivDisplay("block") : setDivDisplay("none") } return [...arr, 5] }); changeParamBool(true); }}  >5th{divHeight}
              </div> : null}

          </div>





        </div>



        <div style={toggle}>
          <div style={{ overflowX: "visible" }}>
            <ul className="list-group" style={{ width: "auto" }}>
              {
                adminUser.map((user, index) => {
                  return <li key={"admin " + index} id={"admin " + index} style={darkMode ? { borderBottom: '2px solid white', padding: '0px' } : { borderBottom: '2px solid black', padding: '0px' }} className={darkMode ? "list-group-item dark-mode" : "list-group-item"}><HtmlTooltip
                    title={
                      <React.Fragment>
                        <span>@{user.username}</span><span></span>
                      </React.Fragment>
                    }
                  >

                    <div style={{ padding: "2px" }}><p style={{ marginBottom: '0.1rem', fontSize: '20px' }}>  <div className="btn-group dropleft">
                      <a href="#" style={{ padding: "0px", color: "#000000" }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <MoreVertIcon style={{ margin: "0px" }}></MoreVertIcon>
                      </a>
                      <div className={darkMode ? "dropdown-menu dark-mode" : "dropdown-menu"}>
                        <div>
                          <button type="button" onClick={()=>setPvtChatDisplay("block")} className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><QuestionAnswerRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></QuestionAnswerRoundedIcon>Personal Chat</button>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div>
                          <button type="button" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"}><VoiceOverOffIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></VoiceOverOffIcon>Force Mute</button>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div>
                          <button type="button" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"}><NetworkCellIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></NetworkCellIcon>Network Speed</button>
                        </div>
                      </div>


                    </div><img src={user.profilePic} alt="profile" style={{ height: '2.5rem', width: '2.5rem', marginLeft: '5px', marginRight: '10px', display: "inline", verticalAlign: "middle" }} /><span style={{ verticalAlign: "middle" }}>{user.name.toUpperCase()}</span><StarRateIcon></StarRateIcon><br /></p>

                    </div>

                  </HtmlTooltip></li>
                })
              }
              {
                userList.map((user, index) => {
                  return <li key={"user " + index} id={"user " + index} style={{ padding: '0px' }} className={darkMode ? "list-group-item dark-mode" : "list-group-item"}><HtmlTooltip
                    title={
                      <React.Fragment>
                        <span>@{user.username}</span><span></span>
                      </React.Fragment>
                    }
                  >
                    <div style={{ padding: "2px" }}><p style={{ marginBottom: '0.1rem', fontSize: '20px' }}>
                      <div className="btn-group dropleft">
                        <a href="#" style={{ padding: "0px", color: "#000000" }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><MoreVertIcon style={{ margin: "0px" }}></MoreVertIcon></a>
                        <div className={darkMode ? "dropdown-menu dark-mode" : "dropdown-menu"}>
                          <div>
                            <button type="button" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><QuestionAnswerRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></QuestionAnswerRoundedIcon>Personal Chat</button>
                          </div>
                          <div className="dropdown-divider"></div>
                          <div>
                            <button type="button" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"}><NetworkCellIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></NetworkCellIcon>Network Speed</button>
                          </div>
                        </div>
                      </div>
                      <img src={user.profilePic} alt="profile" style={{ height: '2.5rem', width: '2.5rem', marginLeft: '5px', marginRight: '10px', display: "inline", verticalAlign: "middle" }} /><span style={{ verticalAlign: "middle" }}>{user.name.toUpperCase()}</span><br /></p>
                    </div>
                  </HtmlTooltip></li>
                })
              }
            </ul>
          </div>
        </div>

        <div style={darkMode ? { ...toggle6, backgroundColor: "#343A40" } : { ...toggle6, backgroundColor: "white" }}>
          <div style={darkMode ? { backgroundColor: " #343A40", height: "100%" } : { backgroundColor: "white", height: "100%" }}>
            <div className={darkMode ? "list-group chat-list dark-mode" : "list-group chat-list"} id="chatsDiv">
              {

                chats.map((chat, index) => {
                  return <div id={index} key={index} style={darkMode ? { borderBottom: '1px solid white', padding: '1em' } : { borderBottom: '1px solid black', padding: '1emm' }} className={darkMode ? "list-group-item dark-mode list-group-item-action flex-column align-items-start" : "list-group-item list-group-item-action flex-column align-items-start"} >
                    <div className="d-flex">
                      <img src={chat.user.profilePic} alt="profile" style={{ height: '1.5rem', width: '1.5rem', marginLeft: '0px', marginRight: '5px', display: "inline", verticalAlign: "middle" }} />
                      <small style={{ display: "inline", verticalAlign: "middle" }}>{chat.user.name}</small>
                    </div>
                    <p className="">{chat.message}</p>
                    <small>{new Date(chat.time).toLocaleString()}</small>
                  </div>
                }
                )

              }
            </div>
            <div style={{ bottom: "5%", marginBottom: "1.5%", backgroundColor: "", position: "fixed", zIndex: "2", height: "10%" }} className={darkMode ? "dark-mode" : null}>
              <p><textarea className="textarea_custom" placeholder="Type message.." name="msg" required style={{ width: "70%" }} value={chatText} onChange={(eve) => { const { value } = eve.target; setChatText(value) }}></textarea>
                <button type="button" className={"btn btn-primary  ml-1"} onClick={postChatMessage} style={{ marginBottom: "20%" }} ><SendIcon style={{ display: "inline", verticalAlign: "middle" }} /></button>
              </p>
            </div>
          </div>
        </div>
        <nav className={darkMode ? "navbar fixed-bottom navbar-dark bg-dark" : "navbar fixed-bottom navbar-light bg-light"} id="bottomNav">
          {adminBoolHelper === true ? <div className="d-flex justify-content-start">
            {darkMode ? <button type='button' className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"} onClick={toggleDarkMode}><WbSunnyRoundedIcon style={{ display: "inline", verticalAlign: "middle" }} /></button> : <button type='button' className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"} onClick={toggleDarkMode}><Brightness2RoundedIcon style={{ display: "inline", verticalAlign: "middle" }} /> </button>}
            <button type="button" className={darkMode ? "btn btn-dark ml-2" : "btn btn-light ml-2"}><AddCircleOutlineRoundedIcon style={{ display: "inline", verticalAlign: "middle" }}></AddCircleOutlineRoundedIcon></button>
            <div className="btn-group dropup">
              <button type="button" className={darkMode ? "btn btn-dark dropdown-toggle ml-2" : "btn btn-light dropdown-toggle ml-2"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <QueuePlayNextRoundedIcon style={{ display: "inline", verticalAlign: "middle" }}></QueuePlayNextRoundedIcon></button>
              <div className={darkMode ? "dropdown-menu dark-mode" : "dropdown-menu"}>
                <button type="button" onClick={() => { changeParam(1); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 1); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? funcSetDiv() : setDivDisplay("none"); } console.log(divHeight); return [...arr, 1] }); changeParamBool(true); }} id="presentation" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"}><DescriptionRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></DescriptionRoundedIcon>Presentation</button>
                <div className="dropdown-divider"></div>
                <button type="button" onClick={() => { changeParam(2); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 2); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? funcSetDiv() : setDivDisplay("none") } console.log(divHeight); return [...arr, 2] }); changeParamBool(true); }} id="screenshare" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><ScreenShareRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></ScreenShareRoundedIcon>Screenshare</button>
                <div className="dropdown-divider"></div>
                <button type="button" onClick={() => { changeParam(3); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 3); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? funcSetDiv() : setDivDisplay("none") } console.log(divHeight); return [...arr, 3] }); changeParamBool(true); }} id="videos" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><LiveTvRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></LiveTvRoundedIcon>Videos</button>
                <div className="dropdown-divider"></div>
                <button type="button" onClick={() => { changeParam(4); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 4); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? funcSetDiv() : setDivDisplay("none") } console.log(divHeight); return [...arr, 4] }); changeParamBool(true); }} id="whiteboard" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><BorderColorRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></BorderColorRoundedIcon>Whiteboard</button>
                <div className="dropdown-divider"></div>
                <button type="button" onClick={() => { changeParam(5); setOpenWindows(prev => { var arr = []; arr = prev.filter(ele => ele !== 5); var length = arr.length; { length === 0 ? setDivHeight("0%") : setDivHeight(100 / length + "%"); length >= 1 ? funcSetDiv() : setDivDisplay("none") } console.log(divHeight); return [...arr, 5] }); changeParamBool(true); }} id="draw" className={darkMode ? "dropdown-item dark-mode" : "dropdown-item"} ><GestureRoundedIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '5px' }}></GestureRoundedIcon>Draw</button>
              </div>
            </div>
            {recording ? <button type="button" className={darkMode ? "btn btn-dark ml-2" : "btn btn-light ml-2"} onClick={toggleRecording}><RemoveCircleOutlineIcon style={{ display: "inline", verticalAlign: "middle", marginRight: '10px' }} />{prettyPrintTime()}</button> : <button type="button" className={darkMode ? "btn btn-dark ml-2" : "btn btn-light ml-2"} onClick={toggleRecording}><RadioButtonCheckedIcon style={{ display: "inline", verticalAlign: "middle" }} /></button>}

          </div> : <div className="d-flex justify-content-start">
              {darkMode ? <button type='button' className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"} onClick={toggleDarkMode}><WbSunnyRoundedIcon style={{ display: "inline", verticalAlign: "middle" }} /></button> : <button type='button' className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"} onClick={toggleDarkMode}><Brightness2RoundedIcon style={{ display: "inline", verticalAlign: "middle" }} /> </button>}</div>}
          <center>
            <div className="d-flex justify-content-center">
              {mic ? <button type='button' className="btn btn-primary ml-2" style={{ borderRadius: "50px" }} onClick={toggle_micState} ><KeyboardVoiceRoundedIcon style={{ display: "inline", verticalAlign: "middle" }}></KeyboardVoiceRoundedIcon></button>
                : <button type="button" className="btn btn-danger ml-2" style={{ borderRadius: "30px" }} onClick={toggle_micState}><MicOffRoundedIcon style={{ display: "inline", verticalAlign: "middle" }}></MicOffRoundedIcon> </button>
              }
              <button type="button" className="btn btn-danger ml-2" style={{ borderRadius: "50px" }} onClick={endCall}><PhoneDisabledIcon style={{ display: "inline", verticalAlign: "middle" }} /></button>
              {video ? <button type="button" className="btn btn-primary ml-2" style={{ borderRadius: "50px" }} onClick={toggle_videoState}><VideocamIcon style={{ display: "inline", verticalAlign: "middle" }}></VideocamIcon></button> :
                <button type="button" className="btn btn-danger ml-2" style={{ borderRadius: "50px" }} onClick={toggle_videoState}><VideocamOffIcon style={{ display: "inline", verticalAlign: "middle" }}></VideocamOffIcon></button>
              }
            </div>
          </center>
          <div className="d-flex justify-content-end">
            <button type="button" onClick={changeToggle_} className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"}><PeopleIcon style={{ display: "inline", verticalAlign: "middle" }}></PeopleIcon></button>

            <button type="button" onClick={changeToggle6_} className={darkMode ? "btn btn-dark  ml-2" : "btn btn-light  ml-2"}><Badge variant={newMessage ? "dot" : null} color="error">
              <ChatIcon style={{ display: "inline", verticalAlign: "middle" }}></ChatIcon></Badge></button>

            <div className="btn-group dropup">
              <button type="button" className={darkMode ? "btn btn-dark dropdown-toggle ml-2" : "btn btn-light dropdown-toggle ml-2"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <InfoIcon style={{ display: "inline", verticalAlign: "middle" }}></InfoIcon></button>
              <div className={darkMode ? "dropdown-menu dropdown-menu-right dark-mode" : "dropdown-menu dropdown-menu-right"} style={{ padding: "10px" }}>
                <div ><h4>Meet Details:</h4></div>
                <div>
                  <h5>{window.location.href}</h5>
                </div>
                <div>
                  <h5>Description: Lorem Ipsum</h5>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </div>

  );
}

export default VideoCall;
