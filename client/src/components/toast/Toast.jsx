import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import  './Toast.css';
function Toast(props){
  return(
    <div id="snackbar">
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      {props.message.image?<img src={props.message.image} class="rounded mr-2" style={{height:"20px",width:"20px"}} alt="user img"/>:null}
      <strong class="mr-auto">{props.message.heading}</strong>
      <br/>
      <small>{new Date().toLocaleTimeString()}</small>
    </div>
    <div class="toast-body">
      {
        props.message.message
      }
    </div>
  </div>
    </div>
  );
}
export default Toast;
