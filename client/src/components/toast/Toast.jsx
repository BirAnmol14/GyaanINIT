import React from 'react';
import './Toast.css';
import parse from 'html-react-parser';
function Toast(props){
  return(
    <div id="snackbar">
    {
      parse(props.message)
    }
    </div>
  );
}
export default Toast;
