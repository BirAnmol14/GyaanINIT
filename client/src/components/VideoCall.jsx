import React from 'react';

function VideoCall(props){
  return(
    <div>
    <h1>Video Call</h1>
    <h2>Url: {window.location.pathname.split('/')[2]}</h2>
    </div>
  );
}

export default VideoCall;
