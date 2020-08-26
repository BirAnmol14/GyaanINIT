import React from 'react';
import './Toast.css';
function Toast(props){
  return(
    <div id="snackbar">
    {
      props.message
    }
    </div>
  );
}
export default Toast;
